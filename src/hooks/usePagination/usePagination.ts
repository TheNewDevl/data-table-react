import { ChangeEvent, useEffect, useState } from "react";
import { DataTableConfig, PaginationHandlers, PaginationHookReturn, PaginationValues } from "../../types";
import { calculateTotalPages, getButtons } from "./functions";

export const usePagination = (
  rowsPerPageOpts: number[] | undefined,
  { pagination }: Partial<DataTableConfig>,
  data: any[]
): PaginationHookReturn => {
  /** States for pagination **/
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOpts ? rowsPerPageOpts[0] : 0);
  const [totalPages, setTotalPages] = useState<number>(pagination ? calculateTotalPages(data, rowsPerPage) : 0);
  const [paginatedData, setPaginatedData] = useState<any[] | undefined>(
    pagination ? data.slice(0, rowsPerPage) : undefined
  );
  const [pageButtons, setPageButtons] = useState<any[]>([]);

  /** Update current page */
  const selectPage = (page: number) => page >= 1 && page <= totalPages && setCurrentPage(page);
  /** Increment current pages */
  const incrementPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  /** Decrement current pages */
  const decrementPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const resetCurrentPage = () => setCurrentPage(1);

  /**
   * Update rows per page using target select value
   * @param event - Change event
   */
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;
    if (value === rowsPerPage || value < 1) return;
    setRowsPerPage(+event.target.value);
    resetCurrentPage();
  };

  /**
   * Check is page is active
   * @param page - Page number
   */
  const isActive = (page?: number): boolean => {
    return page ? currentPage === page : currentPage === totalPages || data.length === 0;
  };

  /** Contain all pagination value */
  const paginationValues: PaginationValues = {
    currentPage,
    rowsPerPage,
    paginatedData,
    rowsPerPageOpts,
    totalPages,
    pageButtons,
    isActive,
  };
  /** Contain all pagination handlers */
  const paginationHandlers: PaginationHandlers = { selectPage, handleChangeRowsPerPage, incrementPage, decrementPage };

  useEffect(() => {
    if (pagination) {
      /** Get start and end index for paginated data */
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const totalPages = calculateTotalPages(data, rowsPerPage);

      /** Update paginated data */
      setPaginatedData(data.slice(startIndex, endIndex));
      setTotalPages(totalPages);
      setPageButtons(getButtons(currentPage, totalPages));
    }
  }, [data, currentPage, rowsPerPage]);

  useEffect(() => {
    window.addEventListener("filter", resetCurrentPage);
    return () => window.removeEventListener("filter", resetCurrentPage);
  }, []);

  return { paginationValues, paginationHandlers };
};
