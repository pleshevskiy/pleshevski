import { AnyNode, Elem } from "ren";

export async function Layout(page: AnyNode): Promise<Elem> {
  return new Elem("html")
    .withAttr("lang", "ru")
    .withChild(
      new Elem("head").withChildren([
        new Elem("meta").withAttr("charset", "utf-8"),
        new Elem("link").withAttrs({
          rel: "stylesheet",
          href: "/static/styles.css",
        }),
        new Elem("title").withText("hello world"),
      ])
    )
    .withChild(
      new Elem("body").withChild(
        new Elem("div").withAttr("id", "root").withChild(page)
      )
    );
}
