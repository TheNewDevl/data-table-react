/**
 * Return the number of total pages. If < 1, return 1
 * @param data - The data to paginate
 * @param rowsPerPage - The number of rows per page
 * @returns The number of total pages
 */
export const calculateTotalPages: (data: any[], rowsPerPage: number) => number = (data, rowsPerPage) => {
  const res = Math.ceil(data.length / rowsPerPage) || 1;
  if (res < 1 || res === Infinity) return 1;
  return res;
};

/**
 * Return an array of page numbers depending on the current page and the number of pages
 * @param currentPage - the current page
 * @param totalPages - the total number of pages
 */
export const getButtons: (currentPage: number, totalPages: number) => number[] | (number | string)[] = (
  currentPage,
  totalPages
) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    }
  }
};
