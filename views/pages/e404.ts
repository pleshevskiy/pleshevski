import { PageLayout } from "../comp/page_layout.ts";
import { AnyNode, E } from "ren/node.ts";
import { classNames } from "ren/attrs.ts";
import { Context } from "../../context.ts";
import { H3 } from "../uikit/typo.ts";

export function E404Page(ctx: Context): AnyNode {
  return PageLayout(ctx, [E404(ctx)]);
}

export function E404(ctx: Context): AnyNode {
  return E("div", classNames("content-width gap-v-1x5"), [
    H3(ctx.tr.Page_not_found),
  ]);
}
