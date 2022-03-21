import { AnyNode, Ea, Elem } from "ren";
import { Context } from "../context.mjs";
import { div } from "../utils.mjs";

export function PageLayout(ctx: Context, ...children: AnyNode[]): Elem {
  return Ea("div", { id: "main" }, [
    Header(ctx.locPath),
    Ea("div", { class: "content" }, children),
    // Footer(),
  ]);
}

export function Header(locPath: string): Elem {
  return Ea("header", { class: "header" }, [
    div({ class: "content-width" }, HeaderNav(locPath)),
  ]);
}

export function HeaderNav(locPath: string): Elem {
  return Ea("nav", { class: "main-menu" }, [
    NavLink(locPath, "/", "Обо мне"),
    NavLink(locPath, "/works", "Работы"),
  ]);
}

export function NavLink(locPath: string, href: string, text: string): Elem {
  const attrs = { href };
  if (locPath === href) attrs["aria-current"] = "true";
  return Ea("a", attrs, text);
}

export function Footer(): Elem {
  return Ea("footer", { class: "footer" }, "footer");
}
