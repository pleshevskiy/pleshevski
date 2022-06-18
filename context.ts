import { Translations } from "./translates/rus.ts";

export interface Context {
  locPath: string;
  lang: Lang;
  tr: Translations;
}

export function getLangHref(lang: Lang, url: string): string {
  return getLangUrlPrefix(lang) + url;
}

export function getLangUrlPrefix(lang: Lang): string {
  return `/${lang}`;
}

export function iterLangs(): Lang[] {
  return [Lang.Eng, Lang.Rus];
}

export enum Lang {
  Rus = "rus",
  Eng = "eng",
}
