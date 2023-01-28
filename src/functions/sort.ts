import { SortCompareFn } from "../types";

/**
 * Compare two dates creating a new Date object from the given params and using the getTime() method
 * @param a - First date to compare
 * @param b - Second date to compare
 * @param sortOrder - Sort order (asc | desc) - Default: "asc"
 * @returns number
 */
export const dateCompareFn: SortCompareFn = (a, b, sortOrder) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return sortOrder === "asc" || !sortOrder ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
};

/**
 * Compare two numbers
 * @param a - First number to compare
 * @param b - Second number to compare
 * @param sortOrder - Sort order (asc | desc) - Default: "asc"
 * @returns number
 */
export const numberCompareFn: SortCompareFn = (a, b, sortOrder) => {
  return sortOrder === "asc" || !sortOrder ? a - b : b - a;
};

/**
 * Compare two strings ( also accept non ASCII characters )
 * @param a - First string to compare
 * @param b - Second string to compare
 * @param sortOrder - Sort order (asc | desc) - Default: "asc"
 * @returns number
 */
export const stringCompareFn: SortCompareFn = (a, b, sortOrder) => {
  return sortOrder === "asc" || !sortOrder ? a.localeCompare(b) : b.localeCompare(a);
};
