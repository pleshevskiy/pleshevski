import { AnyNode, Elem } from "../ren/nodes.mjs";

export async function Layout(page: AnyNode): Promise<Elem> {
  return new Elem("html")
    .withAttr("lang", "ru")
    .withChild(
      new Elem("head")
        .withChild(new Elem("meta").withAttr("charset", "utf-8"))
        .withChild(new Elem("title").withText("hello world"))
    )
    .withChild(new Elem("body").withChild(page));
}
