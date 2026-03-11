import { unaccented } from "./unaccented";

/**
 * Converts a string into a URL-friendly slug.
 * Removes accents, lowercases, replaces non-alphanumeric characters
 * with hyphens, and trims leading/trailing hyphens.
 *
 * @param str String to convert
 * @returns Generated slug
 */
export function slugify(str: string): string {
  return unaccented(str.toString())
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
