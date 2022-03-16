import * as http from "http";
import { Layout } from "./components/layout.mjs";
import { ServerConfig } from "./config.mjs";
import { debug, info } from "./log.mjs";
import { StrRenderer } from "./ren/str.mjs";
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

    const ren = new StrRenderer();
    if (/^[/](?:about[/]?)?$/.test(req.url)) {
      httpRes
        .writeHead(200, { "content-type": "text/html" })
        .end(await ren.render(Layout(AboutPage())));
    } else if (/^[/]works[/]?/.test(req.url)) {
      httpRes
        .writeHead(200, { "content-type": "text/html" })
        .end(await ren.render(Layout(WorksPage())));
    } else {
      httpRes
        .writeHead(404, { "content-type": "text/html" })
        .end(await ren.render(Layout(E404())));
    }
  } catch (err) {
    if (err instanceof InvalidServerRequest) {
      httpRes.writeHead(400).end("Bad request");
    } else if (err instanceof UnsupportedRestMethod) {
      httpRes.writeHead(405).end("Method not allowed");
    }
  }
}

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
