import { StrRenderer } from "ren/str.ts";
import * as log from "./log.ts";
import rusTranslates from "./translates/rus.ts";
import type { Translations } from "./translates/rus.ts";
import { Context, getLangHref, Lang } from "./context.ts";
import { E404Page } from "./views/pages/e404.ts";
import { E500Page } from "./views/pages/e500.ts";
import { AboutPage } from "./views/pages/about.ts";
import { WorksPage } from "./views/pages/works.ts";
import { Layout } from "./views/comp/layout.ts";

if (import.meta.main) {
  await main();
}

async function main() {
  await startServer({ port: 33334 });
}

async function startServer(cfg: ServerConfig) {
  const srv = Deno.listen({ hostname: "localhost", port: cfg.port });
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
  const ctx = createContextFromRequest(req);

  try {
    const res = await tryCreateFileResponse(ctx.locPath);
    return res;
  } catch (_) {
    if (ctx.lang !== Lang.Rus) {
      await loadAndUpdateTranslations(ctx);
    }
    log.debug({ context: ctx });

    const ren = new StrRenderer({
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
      if (ctx.locPath === "/" || ctx.locPath === "/about") {
        return createHtmlResponse(ren.render(AboutPage(ctx)));
      } else if (ctx.locPath === "/works") {
        return createHtmlResponse(ren.render(WorksPage(ctx)));
      } else {
        return createHtmlResponse(ren.render(E404Page(ctx)), 404);
      }
    } catch (_) {
      return createHtmlResponse(ren.render(E500Page(ctx)), 500);
    }
  }
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

function createContextFromRequest(req: Request): Context {
  const locUrl = new URL(req.url);
  const lang = langFromUrl(locUrl);

  return {
    lang,
    locPath: stripPrefix(`/${lang}`, locUrl.pathname),
    tr: rusTranslates,
  };
}

function langFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/eng/") ? Lang.Eng : Lang.Rus;
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
