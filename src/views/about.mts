import { PageLayout } from "../components/page_layout.mjs";
import { AnyNode } from "ren";
import { div, h3, li, p, ul } from "../utils.mjs";

export function AboutPage(): AnyNode {
  return PageLayout(
    div({ class: "content-width responsive-typography" }, [
      div({}, [
        p("Привет!"),
        p("Меня зовут Дмитрий Плешевский."),
        p(
          "Я ведущий разработчик программного обеспечения, архитектор,",
          "руководитель команды, а так же ментор."
        ),
        p(
          "Open-source проекты – моя страсть! Придумываю, экспериментирую,",
          "воплощаю, улучшаю проекты в свое свободное время"
        ),
        p(
          "Помимо программирования я люблю готовить и проводить время со своей",
          "любимой семьей!"
        ),
      ]),
      div({}, [
        h3("Языки программирования"),
        p("Предпочитаю: Rust, TS"),
        p("Огромный опыт: Rust, TS, JS, Python"),
        p("Ограниченный опыт: Haskell, Java, C#"),
      ]),
      div({}, [
        h3("Базы данных"),
        p("Предпочитаю: Postgres"),
        p("Огромный опыт: Postgres, MySQL, Sqlite, mongo"),
      ]),
      div({}, [
        h3("Создание приложений"),
        ul([
          li("Традиционное (SSR + Forms)"),
          li("API (REST/GraphQL/WebSocket/EventSource)"),
          li("Динамическое (SPA)"),
          li("Гибридное (SSR + SPA)"),
          li("Консольные"),
          li("Кроссплатформенные"),
        ]),
      ]),
    ])
  );
}
