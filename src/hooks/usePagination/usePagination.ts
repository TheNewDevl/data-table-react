import { ChangeEvent, useEffect, useState } from "react";
import { useTableCtx } from "../../context/TableContext";
import { DataTableConfig, PaginationHandlers, PaginationHookReturn, PaginationValues } from "../../types";

export const usePagination = (
  rowsPerPageOpts: number[] | undefined,
  { pagination }: Partial<DataTableConfig>
): PaginationHookReturn => {
  /** Get data from context **/
  const { filteredData: data } = useTableCtx();

  /** States for pagination **/
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOpts ? rowsPerPageOpts[0] : 0);
  const [totalPages, setTotalPages] = useState<number>(pagination ? Math.ceil(data.length / rowsPerPage) : 0);
  const [paginatedData, setPaginatedData] = useState<any[] | undefined>(
    pagination ? data.slice(0, rowsPerPage) : undefined
  );
  // Handle page buttons
  const [pageButtons, setPageButtons] = useState<any[]>([]);

  /**
   * Return an array of page numbers depending on the current page and the number of pages
   * @param currentPage - the current page
   * @param totalPages - the total number of pages
   */
  const getButtons = (currentPage: number, totalPages: number): number[] | (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        return [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
  };

  /** Update current page */
  const selectPage = (page: number) => setCurrentPage(page);
  /** Increment current pages */
  const incrementPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  /** Decrement current pages */
  const decrementPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  /**
   * Update rows per page using target select value
   * @param event - Change event
   */
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
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
      const totalPages = Math.ceil(data.length / rowsPerPage);

      /** Update paginated data */
      setPaginatedData(data.slice(startIndex, endIndex));
      setTotalPages(totalPages);
      setPageButtons(getButtons(currentPage, totalPages));
    }
  }, [data, currentPage, rowsPerPage]);

  /*useEffect(() => {
    if (pagination) setCurrentPage(1);
  }, [data]);*/
  useEffect(() => {
    const resetCurrentPage = () => setCurrentPage(1);
    window.addEventListener("filter", resetCurrentPage);
    return () => window.removeEventListener("filter", resetCurrentPage);
  }, []);

  return { paginationValues, paginationHandlers };
};
