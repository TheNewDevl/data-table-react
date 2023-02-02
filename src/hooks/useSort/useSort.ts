import { useEffect, useState } from "react";
import { DataTableConfig, SortConfig, SortHookReturn } from "../../types";
import { useTableCtx } from "../../context/TableContext";
import { isValidDate } from "../../functions/dates/dates";
import { dateCompareFn, numberCompareFn, stringCompareFn } from "../../functions/sort/sort";

export const useSort = ({ sortable }: Partial<DataTableConfig>): SortHookReturn => {
  /** Sort config States */
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortKey: "",
    sortOrder: "asc",
    sortType: undefined,
  });

  /** Get data from ctx */
  const { filteredData, updateFilteredData } = useTableCtx();

  /**
   * Update sort config. If the same key is clicked, toggle the sort order
   * @param key - Key to sort by
   * @param type - Type of data to sort
   */
  const handleSortConfig = (key: string, type: SortConfig["sortType"]): void => {
    setSortConfig({
      sortKey: key,
      sortOrder: sortConfig.sortKey === key && sortConfig.sortOrder === "asc" ? "desc" : "asc",
      sortType: type ?? undefined,
    });
  };

  /**
   * Sort data function
   * If sortKey is empty or table is not sortable, return the data as is
   * To prevent errors it will check if a value exists with the given key and replace it with a default value if not.
   * If a value is a date, it will convert it to a date object and compare it
   *  @param data - Data to sort
   */
  const sortDataFn = (data: any[]): any[] => {
    const { sortKey, sortOrder, sortType } = sortConfig;
    if (!sortKey || !sortable) return data;

    return [...data].sort((a, b) => {
      const defaultValues = {
        date: "01/01/111",
        number: 0,
        string: "ZZZZ",
      };
      // Check if value exists, if not, replace with default value
      const valA = a[sortKey] ?? defaultValues[sortType ?? "string"];
      const valB = b[sortKey] ?? defaultValues[sortType ?? "string"];

      // Call the correct compare function based on the sort type
      if (sortType === "date") {
        return dateCompareFn(valA, valB, sortOrder);
      } else if (sortType === "number") {
        return numberCompareFn(valA, valB, sortOrder);
      } else if (sortType === "string") {
        return stringCompareFn(valA, valB, sortOrder);
      } else if (sortType === undefined) {
        // If sort type is undefined, check if the value is a date or number and call the correct compare function
        if (isValidDate(valA) && isValidDate(valB)) {
          return dateCompareFn(valA, valB, sortOrder);
        } else if (!isNaN(valA) && !isNaN(valB)) {
          return numberCompareFn(valA, valB, sortOrder);
        }
      }
      return stringCompareFn(valA, valB, sortOrder);
    });
  };

  /** Update data when sortConfig change */
  useEffect(() => {
    updateFilteredData(sortDataFn(filteredData));
  }, [sortConfig]);

  return { sortConfig, handleSortConfig, sortDataFn };
};
