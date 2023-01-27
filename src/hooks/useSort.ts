import { useEffect, useState } from "react";
import { DataTableConfig, SortConfig, SortHookReturn } from "../types";
import { useTableCtx } from "../context/TableContext";

export const useSort = ({ sortable }: Partial<DataTableConfig>): SortHookReturn => {
  /** Sort config States */
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortKey: "",
    sortOrder: "asc",
  });

  /** Get data from ctx */
  const { filteredData, updateFilteredData } = useTableCtx();

  /**
   * Update sort config. If the same key is clicked, toggle the sort order
   * @param key - Key to sort by
   */
  const handleSortConfig = (key: string): void => {
    setSortConfig({
      sortKey: key,
      sortOrder: sortConfig.sortKey === key && sortConfig.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  /** Sort data function
   * If sortKey is empty or table is not sortable, return the data as is
   * If sortKey is not empty, sort the data by the sortKey
   *  @param data - Data to sort
   */
  const sortDataFn = (data: any[]): any[] => {
    const { sortKey, sortOrder } = sortConfig;
    if (!sortKey || !sortable) return data;
    return [...data].sort((a, b) =>
      sortOrder === "asc" ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey].localeCompare(a[sortKey])
    );
  };

  /** Update data when sortConfig change */
  useEffect(() => {
    updateFilteredData(sortDataFn(filteredData));
  }, [sortConfig]);

  return { sortConfig, handleSortConfig, sortDataFn };
};
