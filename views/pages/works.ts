import { PageLayout } from "../comp/page_layout.ts";
import { AnyNode, E } from "ren/node.ts";
import { classNames } from "ren/attrs.ts";
import { Context } from "../../context.ts";
import { H3 } from "../uikit/typo.ts";

const ul = E.bind(null, "ul", []);
const li = E.bind(null, "li", []);

export function WorksPage(ctx: Context): AnyNode {
  return PageLayout(ctx, [
    E("div", classNames("content-width gap-v-1x5 responsive-typography"), [
      H3(ctx.tr.My_latest_works),
      ul([
        li([RepoLink("ren", "/pleshevskiy/ren")]),
        li([RepoLink("hwt", "github.com/pleshevskiy/hwt")]),
        li([RepoLink("sonic-channel", "github.com/pleshevskiy/sonic-channel")]),
        li([RepoLink("migra", "github.com/pleshevskiy/migra")]),
        li([RepoLink("itconfig", "/pleshevskiy/itconfig")]),
      ]),
    ]),
  ]);
}

export function RepoLink(name: string, repo: string): AnyNode {
  const gitBase = new URL("https://git.pleshevski.ru");
  return E("a", {
    target: "_blank",
    href: new URL(repo, gitBase).toString(),
    rel: "external nofollow noopener noreferrer",
  }, name);
}
