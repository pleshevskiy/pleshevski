import { AnyNode, Elem } from "ren";

export function Layout(page: AnyNode): Elem {
  return new Elem("html").withAttr("lang", "ru").withChildren(
    new Elem("head").withChildren(
      new Elem("meta").withAttr("charset", "utf-8"),
      new Elem("link").withAttrs({
        rel: "stylesheet",
        href: "/static/styles.css",
      }),
      new Elem("title").withText("hello world")
    ),
    new Elem("body").withChildren(
      new Elem("div").withAttr("id", "root").withChildren(page)
    )
  );
}
