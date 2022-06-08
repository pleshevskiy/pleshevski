import { classNames } from "ren/attrs.ts";
import { E, Elem } from "ren/node.ts";

export function H3(text: string): Elem {
  return E("h3", classNames("font-h3"), text);
}
