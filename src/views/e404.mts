import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode, Ea } from "ren";
import { div } from "../utils.mjs";

export function E404(): AnyNode {
  return PageLayout(
    div(
      { class: "content-width" },
      Ea("h3", { class: "font-h3" }, "Страница не найдена")
    )
  );
}
