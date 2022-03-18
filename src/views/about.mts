import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode, Elem } from "ren";

export function AboutPage(): AnyNode {
  return PageLayout(new Elem("p").withText("Привет мир"));
}
