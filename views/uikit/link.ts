import { AnyNode, Attrs, E } from "ren/node.ts";

export function RepoLink(name: string, repo: string): AnyNode {
  const gitBase = new URL("https://git.pleshevski.ru");

  return Link(name, {
    target: "_blank",
    href: new URL(repo, gitBase).toString(),
    rel: "external nofollow noopener noreferrer",
  });
}

export function Link(text: string, attrs: Attrs | Attrs[]): AnyNode {
  return E("a", attrs, text);
}
