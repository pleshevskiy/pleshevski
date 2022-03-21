import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode, Ea } from "ren";
import { div, h3, li, ul } from "../utils.mjs";
import { Context } from "../context.mjs";

export function WorksPage(ctx: Context): AnyNode {
  return PageLayout(
    ctx,
    div({ class: "content-width responsive-typography" }, [
      h3("Одни из моих последних работ"),
      ul([
        li(Ea("a", { href: "https://github.com/pleshevskiy/ren" }, "ren")),
        li(Ea("a", { href: "https://github.com/pleshevskiy/hwt" }, "hwt")),
        li(
          Ea(
            "a",
            { href: "https://github.com/pleshevskiy/sonic-channel" },
            "sonic-channel"
          )
        ),
        li(Ea("a", { href: "https://github.com/pleshevskiy/migra" }, "migra")),
        li(
          Ea(
            "a",
            { href: "https://github.com/pleshevskiy/itconfig-rs" },
            "itconfig-rs"
          )
        ),
      ]),
    ])
  );
}
