import { PageLayout } from "../comp/page_layout.ts";
import { AnyNode, E } from "ren/node.ts";
import { classNames } from "ren/attrs.ts";
import { Context } from "../../context.ts";

export function ContentPage(ctx: Context, content: AnyNode): AnyNode {
  return PageLayout(ctx, [
    E("div", classNames("content-width responsive-typography"), [content]),
  ]);
}
