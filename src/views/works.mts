import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode } from "ren";
import { div, p } from "../utils.mjs";
import { Context } from "../context.mjs";

export function WorksPage(ctx: Context): AnyNode {
  return PageLayout(ctx, div({ class: "content-width" }, p("Works")));
}
