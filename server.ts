import { MarkdownParser } from "par/md.ts";
import { HtmlStrRenderer } from "ren/html_str.ts";
import * as log from "./log.ts";
import rusTranslates from "./translates/rus.ts";
import type { Translations } from "./translates/rus.ts";
import { Context, getLangHref, getLangUrlPrefix, Lang } from "./context.ts";
import { E404Page } from "./views/pages/e404.ts";
import { E500Page } from "./views/pages/e500.ts";
import { WorksPage } from "./views/pages/works.ts";
import { Layout } from "./views/comp/layout.ts";
import { ContentPage } from "./views/pages/content.ts";

if (import.meta.main) {
  await main();
}

async function main() {
  await startServer({ port: 33334 });
}

async function startServer(cfg: ServerConfig) {
  const srv = Deno.listen({ hostname: "0.0.0.0", port: cfg.port });
  log.info(`Server listening at http://localhost:${cfg.port}`);

  for await (const conn of srv) {
    serveHttp(conn);
  }
}

interface ServerConfig {
  port: number;
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const reqEvt of httpConn) {
    const res = await handleRequest(reqEvt.request);
    reqEvt.respondWith(res);
  }
}

async function handleRequest(req: Request): Promise<Response> {
  log.info({ method: req.method, url: req.url });

  if (req.method === "GET") {
    return await handleGet(req);
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}

async function handleGet(req: Request) {
  const restCtx = createRestContextFromRequest(req);

  try {
    const res = await tryCreateFileResponse(restCtx.locPath);
    return res;
  } catch (_) {
    if (restCtx.lang == null && restCtx.newLang) {
      return new Response(null, {
        status: 301,
        headers: {
          location: getLangUrlPrefix(restCtx.newLang) + restCtx.locPath,
        },
      });
    }

    const ctx = intoAppContext(restCtx);

    if (restCtx.lang !== Lang.Rus) {
      await loadAndUpdateTranslations(ctx);
    }
    log.debug({ context: restCtx });

    const par = new MarkdownParser();
    const ren = new HtmlStrRenderer({
      wrapNode: Layout.bind(null, ctx),
      onVisitAttr: ([key, value]) => {
        if (key === "lhref" && typeof value === "string") {
          return ["href", getLangHref(ctx.lang, value)];
        } else {
          return [key, value];
        }
      },
    });

    try {
      if (restCtx.locPath === "/" || restCtx.locPath === "/about") {
        const res = par.parse(
          await readMarkdownFile("data/about", ctx.lang),
        );
        return createHtmlResponse(ren.render(ContentPage(ctx, res)));
      } else if (restCtx.locPath === "/works") {
        return createHtmlResponse(ren.render(WorksPage(ctx)));
      } else {
        return createHtmlResponse(ren.render(E404Page(ctx)), 404);
      }
    } catch (e) {
      log.error(e);
      return createHtmlResponse(ren.render(E500Page(ctx)), 500);
    }
  }
}

async function readMarkdownFile(dirPath: string, lang: Lang): Promise<string> {
  return await Deno.readTextFile(`${dirPath}/${lang}.md`)
    .catch((_) => Deno.readTextFile(`${dirPath}/${Lang.Rus}.md`));
}

async function loadAndUpdateTranslations(ctx: Context) {
  try {
    const translates = await import(`./translates/${ctx.lang}.ts`);
    ctx.tr = Object.entries(translates.default as Partial<Translations>)
      .reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key as keyof Translations]: val,
        }),
        { ...ctx.tr } as Translations,
      );
  } catch (err) {
    log.debug({ err });
    /* ignore */
  }
}

function intoAppContext(restCtx: RestContext): Context {
  return {
    locPath: restCtx.locPath,
    lang: restCtx.lang || Lang.Rus,
    tr: restCtx.tr,
  };
}

function createRestContextFromRequest(req: Request): RestContext {
  log.debug(req.headers);

  const locUrl = new URL(req.url);
  const lang = tryIntoAppLangFromUrl(locUrl);

  return {
    lang,
    newLang: getPreferRequestLang(req.headers) ?? Lang.Rus,
    locPath: stripPrefix(`/${lang}`, locUrl.pathname),
    tr: rusTranslates,
  };
}

interface RestContext {
  locPath: string;
  lang: Lang | null;
  newLang: Lang;
  tr: Translations;
}

function getPreferRequestLang(headers: Headers): Lang | null {
  const acceptLanguageHeader = headers.get("accept-language");
  if (!acceptLanguageHeader) return null;

  const acceptLanguages = acceptLanguageHeader
    .split(/,\s*/)
    .map((part) => part.split(";q=")[0])
    .map(tryIntoAppLangFromAcceptLangCode)
    .filter((lang): lang is Lang => !!lang);
  return acceptLanguages[0] ?? null;
}

function tryIntoAppLangFromAcceptLangCode(lang: string): Lang | null {
  return lang === "*"
    ? Lang.Rus
    : lang.startsWith("en")
    ? Lang.Eng
    : lang.startsWith("ru")
    ? Lang.Rus
    : null;
}

function tryIntoAppLangFromUrl(url: URL): Lang | null {
  return url.pathname.startsWith("/eng/")
    ? Lang.Eng
    : url.pathname.startsWith("/rus/")
    ? Lang.Rus
    : null;
}

function stripPrefix(prefix: string, val: string): string {
  return val.startsWith(prefix) ? val.slice(prefix.length) : val;
}

function createHtmlResponse(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: getContentTypeHeader("html"),
  });
}

async function tryCreateFileResponse(urlPath: string): Promise<Response> {
  const filePath = extractFilePath(urlPath);
  log.debug({ filePath });
  if (!filePath) throw new SkipFile();

  const content = await Deno.readTextFile(filePath).catch(() => {
    throw new SkipFile();
  });

  return createFileResponse(content, getFileExt(filePath));
}

class SkipFile extends Error {}

function createFileResponse(content: string, fileExt: string): Response {
  return new Response(content, {
    headers: getContentTypeHeader(fileExt),
  });
}

function extractFilePath(urlPath: string): string | null {
  const relPath = urlPath.slice(1);
  if (relPath.startsWith("styles/")) {
    return `public/${relPath}`;
  }
  return null;
}

function getContentTypeHeader(fileExt: string): Record<string, string> {
  return { "content-type": getContentTypeByExt(fileExt) };
}

function getContentTypeByExt(fileExt: string): string {
  switch (fileExt) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    default:
      return "text/plain";
  }
}

function getFileExt(filePath: string): string {
  return filePath.slice((filePath.lastIndexOf(".") - 1 >>> 0) + 2);
}
