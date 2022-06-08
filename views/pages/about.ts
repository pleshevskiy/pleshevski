import { PageLayout } from "../comp/page_layout.ts";
import { AnyNode, E } from "ren/node.ts";
import { classNames } from "ren/attrs.ts";
import { Context } from "../../context.ts";
import { H3 } from "../uikit/typo.ts";

const p = E.bind(null, "p", []);
const ul = E.bind(null, "ul", []);
const li = E.bind(null, "li", []);

export function AboutPage(ctx: Context): AnyNode {
  return PageLayout(ctx, [
    E("div", classNames("content-width responsive-typography"), [
      p(ctx.tr.about.Hi),
      p(ctx.tr.about.My_name_is_Dmitriy_Pleshevskiy),
      p(
        ctx.tr.about
          .I_am_lead_software_developer_architect_team_leader_and_mentor,
      ),
      p(
        ctx.tr.about
          .Open_source_projects_are_my_passion_I_invent_experiment_implement_and_improve_projects_in_my_spare_time,
      ),
      p(
        ctx.tr.about
          .Besides_programming_I_love_to_cook_and_spend_time_with_my_beloved_family,
      ),

      H3(ctx.tr.about.Programming_languages),
      p(`${ctx.tr.about.Prefer}: Rust, TS, Bash`),
      p(`${ctx.tr.about.Extensive_experience}: Rust, TS, JS, Python, Bash`),
      p(`${ctx.tr.about.Limited_experience}: Haskell, Java, C#, C++`),

      H3(ctx.tr.about.Databases),
      p(`${ctx.tr.about.Prefer}: Postgres`),
      p(`${ctx.tr.about.Extensive_experience}: Postgres, MySQL, Sqlite, Mongo`),

      H3(ctx.tr.about.Creating_applications),
      ul([
        li(`${ctx.tr.about.Traditional} (SSR + Forms)`),
        li("API (REST/GraphQL/WebSocket/EventSource)"),
        li(`${ctx.tr.about.Dynamic} (SPA)`),
        li(`${ctx.tr.about.Hybrid} (SSR + SPA)`),
        li(ctx.tr.about.Console),
        li(ctx.tr.about.Crossplatform),
      ]),
    ]),
  ]);
}
