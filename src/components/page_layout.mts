import { AnyNode, Elem, Frag } from "ren";

export async function PageLayout(children: AnyNode[]): Promise<Frag> {
  return new Frag()
    .withChild(Header())
    .withChild(
      new Elem("div").withAttr("class", "content").withChildren(children)
    )
    .withChild(Footer());
}

export function Header(): Elem {
  return new Elem("header").withChild(HeaderNav());
}

export function HeaderNav(): Elem {
  return new Elem("nav").withChildren([
    new Elem("a").withAttr("href", "/").withText("About"),
    new Elem("a").withAttr("href", "/works").withText("Works"),
  ]);
}

export function Footer(): Elem {
  return new Elem("footer").withAttr("class", "footer").withText("footer");
}
