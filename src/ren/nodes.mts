import { isNil, Nilable } from "../lang.mjs";

export type AnyNode = AnySyncNode | AnyAsyncNode;
export type AnyAsyncNode = Promise<AnySyncNode>;
export type AnySyncNode = TextNode | Elem | Frag;

export class TextNode extends String {}

export function F(children: AnyNode[]): Frag {
  return new Frag().withChildren(children);
}

export class Frag {
  #children: Nilable<AnyNode[]>;

  constructor() {
    this.#children = undefined;
  }

  get children(): Nilable<AnyNode[]> {
    return this.#children;
  }

  withText(text: string): this {
    this.addText(text);
    return this;
  }

  addText(text: string): void {
    this.addChild(new TextNode(text));
  }

  maybeWithChildren(nodes?: Nilable<AnyNode[]>): this {
    if (isNil(nodes)) return this;
    return this.withChildren(nodes);
  }

  withChildren(nodes: AnyNode[]): this {
    nodes.forEach((n) => this.addChild(n));
    return this;
  }

  withChild(node: AnyNode): this {
    this.addChild(node);
    return this;
  }

  addChild(node: AnyNode): void {
    if (isNil(this.#children)) this.#children = [];
    this.#children.push(node);
  }
}

export function E(
  tagName: string,
  attrs: ElemAttrs,
  children?: Nilable<AnyNode[]>
): Elem {
  return new Elem(tagName).withAttrs(attrs).maybeWithChildren(children);
}

export type ElemAttrs = Record<string, unknown>;

export class Elem extends Frag {
  #tagName: string;
  #attrs: ElemAttrs;
  #isSelfClosed: boolean;

  constructor(tagName: string) {
    super();
    this.#tagName = tagName;
    this.#attrs = {};
    this.#isSelfClosed = selfClosedTagNames.has(tagName);
  }

  get tagName(): string {
    return this.#tagName;
  }

  get attrs(): Record<string, unknown> {
    return this.#attrs;
  }

  withAttrs(attrs: Record<string, unknown>): Elem {
    Object.entries(attrs).forEach(([key, value]) => this.addAttr(key, value));
    return this;
  }

  withAttr(name: string, value: unknown): Elem {
    this.addAttr(name, value);
    return this;
  }

  addAttr(name: string, value: unknown): void {
    this.#attrs[name] = value;
  }

  addChild(node: AnySyncNode): void {
    if (this.#isSelfClosed)
      throw new Error("You cannot add child to self closed element");
    super.addChild(node);
  }
}

const selfClosedTagNames = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
