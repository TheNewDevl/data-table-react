import { vi } from "vitest";
import { PaginationValues, PaginationHandlers } from "../../types";

export const mockUsePagination = () => {
  const pagination = {
    values: {
      pageButtons: [1, 2, 3, 4, 5],
      currentPage: 1,
      isActive: vi
        .fn()
        .mockImplementation((page?: number) =>
          page ? pagination.values.currentPage === page : pagination.values.currentPage === pagination.values.totalPages
        ),
      paginatedData: [],
      rowsPerPageOpts: [10, 20, 30],
      rowsPerPage: 10,
      totalPages: 5,
    } as PaginationValues,
    handlers: {
      selectPage: vi.fn(),
      incrementPage: vi.fn(),
      decrementPage: vi.fn(),
      handleChangeRowsPerPage: vi.fn(),
    } as PaginationHandlers,
  };
  return pagination;
};
