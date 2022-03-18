import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode, Elem } from "ren";

export function E404(): AnyNode {
  return PageLayout(new Elem("p").withText("Page not found"));
}
