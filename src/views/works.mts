import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode } from "ren";
import { div, p } from "../utils.mjs";

export function WorksPage(): AnyNode {
  return PageLayout(div({ class: "content-width" }, p("Works")));
}
