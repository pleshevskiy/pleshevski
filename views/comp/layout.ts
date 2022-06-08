import { AnyNode, E } from "ren/node.ts";
import { Context } from "../../context.ts";

export function Layout(ctx: Context, page: AnyNode): AnyNode {
  return E("html", { lang: ctx.lang }, [
    E("head", [], [
      E("meta", { charset: "utf-8" }),
      E("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      }),
      E("link", { rel: "stylesheet", href: "/styles/main.css" }),
      E("title", [], "Recipes"),
    ]),
    E("body", [], [
      E("div", { id: "root" }, [page]),
    ]),
  ]);
}
