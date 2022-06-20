import { AnyNode, Attrs, E, Elem } from "ren/node.ts";
import { classNames } from "ren/attrs.ts";
import { Context, getLangHref, iterLangs, Lang } from "../../context.ts";
import { Link, RepoLink } from "../uikit/link.ts";

export function PageLayout(ctx: Context, children: AnyNode[]): Elem {
  return E("div", { id: "main" }, [
    Header(ctx),
    E("div", classNames("content"), children),
    Footer(ctx),
  ]);
}

export function Header(ctx: Context): AnyNode {
  return E("header", classNames("header gap-v-1x5"), [
    E("div", classNames("content-width"), [HeaderNav(ctx)]),
  ]);
}

export function HeaderNav(ctx: Context): AnyNode {
  return E("nav", classNames("main-menu"), [
    Link(ctx.tr.About, navLink("/", ctx)),
    Link(ctx.tr.Works, navLink("/works", ctx)),
  ]);
}

function navLink(lhref: string, ctx?: Context): Attrs {
  const attrs: Attrs = { lhref };
  if (ctx?.locPath === lhref) attrs["aria-current"] = "true";
  return attrs;
}

const SERVER_STARTED_AT = new Date();

export function Footer(ctx: Context): AnyNode {
  return E("footer", classNames("footer"), [
    E("div", classNames("content-width row-sta-bet"), [
      E("div", classNames("gap-v-1x5"), [
        E("div", [], [
          E("b", [], "Updated At:"),
          SERVER_STARTED_AT.toLocaleDateString(),
        ]),
        E("div", [], [
          RepoLink(ctx.tr.Source_code, "/pleshevskiy/pleshevski.ru"),
        ]),
      ]),
      ChangeLang(ctx),
    ]),
  ]);
}

export function ChangeLang(ctx: Context): AnyNode {
  const dropdownId = "change_langs";
  return E("div", classNames("dropdown"), [
    E("input", { id: dropdownId, type: "checkbox" }),
    E("label", { for: dropdownId }, ctx.lang),
    E(
      "ul",
      [],
      iterLangs().filter((l) => l !== ctx.lang).map((l) =>
        ChangeLangBtn(ctx, l)
      ),
    ),
  ]);
}

export function ChangeLangBtn(ctx: Context, lang: Lang): AnyNode {
  return Link(lang, { "href": getLangHref(lang, ctx.locPath) });
}
