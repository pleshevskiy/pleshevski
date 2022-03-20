import * as http from "http";
import * as fs from "fs/promises";
import * as path from "path";
import { Layout } from "./components/layout.mjs";
import { ServerConfig } from "./config.mjs";
import { debug, info } from "./log.mjs";
import { StrRenderer } from "ren";
import { AboutPage } from "./views/about.mjs";
import { E404 } from "./views/e404.mjs";
import { WorksPage } from "./views/works.mjs";

export function createServer(cfg: ServerConfig): void {
  const server = http.createServer(handleHttpReq);
  server.listen(cfg.port, () => {
    info("[server]", `Server listening at http://localhost:${cfg.port}`);
  });
}

async function handleHttpReq(
  httpReq: http.IncomingMessage,
  httpRes: http.ServerResponse
): Promise<void> {
  try {
    const req = tryIntoAppServerRequest(httpReq);

    debug("[server]", { req });

    if (req.url.startsWith("/static")) {
      const relFilePath = path.join(process.cwd(), req.url.slice(1));
      const mimeType = mimeTypeByExt.get(path.extname(relFilePath));

      const fileContent = await fs
        .readFile(relFilePath, { encoding: "utf-8" })
        .catch((_e) => null);

      if (fileContent && mimeType) {
        httpRes.writeHead(200, { "content-type": mimeType }).end(fileContent);
      } else {
        httpRes.writeHead(404).end("Not found");
      }
    } else {
      const ren = new StrRenderer();
      if (/^[/](?:about[/]?)?$/.test(req.url)) {
        httpRes
          .writeHead(200, { "content-type": "text/html" })
          .end(ren.render(Layout(AboutPage())));
      } else if (/^[/]works[/]?$/.test(req.url)) {
        httpRes
          .writeHead(200, { "content-type": "text/html" })
          .end(ren.render(Layout(WorksPage())));
      } else {
        httpRes
          .writeHead(404, { "content-type": "text/html" })
          .end(ren.render(Layout(E404())));
      }
    }
  } catch (err) {
    if (err instanceof InvalidServerRequest) {
      httpRes.writeHead(400).end("Bad request");
    } else if (err instanceof UnsupportedRestMethod) {
      httpRes.writeHead(405).end("Method not allowed");
    }
  }
}

const mimeTypeByExt = new Map([[".css", "text/css"]]);

export function tryIntoAppServerRequest(
  req: http.IncomingMessage
): ServerRequest {
  if (!req.method || !req.url) throw new InvalidServerRequest();

  return {
    method: tryIntoAppRestMethod(req.method),
    url: req.url,
  };
}

export interface ServerRequest {
  method: RestMethod;
  url: string;
}

export class InvalidServerRequest extends Error {}

export function tryIntoAppRestMethod(rest: string): RestMethod {
  switch (rest.toUpperCase()) {
    case "GET":
      return RestMethod.Get;
    default:
      throw new UnsupportedRestMethod();
  }
}

export enum RestMethod {
  Get = "GET",
}

export class UnsupportedRestMethod extends Error {}

export interface ServerResponse {
  statusCode?: number;
  headers?: Headers;
  body: string;
}
