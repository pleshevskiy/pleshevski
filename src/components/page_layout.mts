import { AnyNode, E, Ea, Elem } from "ren";
import { div } from "../utils.mjs";

export function PageLayout(...children: AnyNode[]): Elem {
  return Ea("div", { id: "main" }, [
    Header(),
    Ea("div", { class: "content" }, children),
    Footer(),
  ]);
}

export function Header(): Elem {
  return Ea("header", { class: "header" }, [
    div({ class: "content-width" }, HeaderNav()),
  ]);
}

export function HeaderNav(): Elem {
  return E("nav", [
    Ea("a", { href: "/" }, "Обо мне"),
    Ea("a", { href: "/works" }, "Работы"),
  ]);
}

export function Footer(): Elem {
  return Ea("footer", { class: "footer" }, "footer");
}
