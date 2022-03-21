import { AnyNode, E, Ea, Elem } from "ren";
import { config } from "../config.mjs";
import { div } from "../utils.mjs";

export function Layout(page: AnyNode): Elem {
  return Ea("html", { lang: "ru" }, [
    E("head", [
      Ea("meta", { charset: "utf-8" }),
      Ea("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      Ea("link", {
        rel: "stylesheet",
        href: "/static/styles.css",
      }),
      E("title", "hello world"),
    ]),
    E("body", [div({ id: "root" }, page), config.isDev && HotReloadScript()]),
  ]);
}

function HotReloadScript(): Elem {
  return E(
    "script",
    `const ws = new WebSocket("ws://localhost:30001");
    ws.addEventListener("message", (m) => {
      if (m.data === "RELOAD") location.reload();
    });`
  );
}
