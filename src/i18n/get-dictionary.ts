import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { esDictionary } from "./dictionaries/es";
import { enDictionary } from "./dictionaries/en";

const DICTIONARIES: Record<Locale, Dictionary> = {
  es: esDictionary,
  en: enDictionary,
};

/** Returns the compile-time validated dictionary for a given locale. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
