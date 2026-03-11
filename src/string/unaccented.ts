/**
 * Removes all accent marks from a string using Unicode normalization.
 *
 * @param str String to process
 * @returns String without accent marks
 */
export function unaccented(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
