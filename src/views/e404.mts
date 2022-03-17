import { PageLayout } from "../components/page_layout.mjs";
import { AnyAsyncNode, Elem } from "ren";

export async function E404(): AnyAsyncNode {
  return PageLayout([new Elem("p").withText("Page not found")]);
}
