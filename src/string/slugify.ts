import { unaccented } from "./unaccented";

export function slugify(str: string): string {
  return unaccented(str.toString())
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
