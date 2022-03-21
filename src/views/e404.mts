import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode, Ea } from "ren";
import { div } from "../utils.mjs";
import { Context } from "../context.mjs";

export function E404(ctx: Context): AnyNode {
  return PageLayout(
    ctx,
    div(
      { class: "content-width" },
      Ea("h3", { class: "font-h3" }, "Страница не найдена")
    )
  );
}
