import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode, Elem } from "ren";

export function WorksPage(): AnyNode {
  return PageLayout(new Elem("p").withText("Works"));
}
