import { AnyNode, Elem } from "ren";

export function PageLayout(...children: AnyNode[]): Elem {
  return new Elem("div")
    .withAttr("id", "main")
    .withChildren(
      Header(),
      new Elem("div").withAttrs({ class: "content" }).withChildren(...children),
      Footer()
    );
}

export function Header(): Elem {
  return new Elem("header").withChildren(HeaderNav());
}

export function HeaderNav(): Elem {
  return new Elem("nav").withChildren(
    new Elem("a").withAttr("href", "/").withText("About"),
    new Elem("a").withAttr("href", "/works").withText("Works")
  );
}

export function Footer(): Elem {
  return new Elem("footer").withAttr("class", "footer").withText("footer");
}
