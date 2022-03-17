import { PageLayout } from "../components/page_layout.mjs";
import { AnyAsyncNode, Elem } from "ren";

export async function AboutPage(): AnyAsyncNode {
  return PageLayout([new Elem("p").withText("Привет мир")]);
}
