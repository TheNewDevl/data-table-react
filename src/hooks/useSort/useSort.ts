import { useEffect, useState } from "react";
import { DataTableConfig, SortConfig, SortHookReturn } from "../../types/types";
import { useTableCtx } from "../../context/TableContext";
import { isValidDate } from "../../functions/dates/dates";
import { booleanCompareFn, dateCompareFn, numberCompareFn, stringCompareFn } from "../../functions/sort/sort";

export const useSort = ({ sortable }: Partial<DataTableConfig>): SortHookReturn => {
  /** Sort config States */
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortKey: "",
    sortOrder: "asc",
    sortType: undefined,
    customSortFn: undefined,
  });

  /** Get data from ctx */
  const { tableData, updateTableData } = useTableCtx();

  /**
   * Update sort config. If the same key is clicked, toggle the sort order
   * @param key - Key to sort by
   * @param type - Type of data to sort
   * @param customSortFn - Custom sort function
   */
  const handleSortConfig = (
    key: string,
    type: SortConfig["sortType"],
    customSortFn: ((a: any, b: any) => number) | undefined
  ): void => {
    setSortConfig({
      sortKey: key,
      sortOrder: sortConfig.sortKey === key && sortConfig.sortOrder === "asc" ? "desc" : "asc",
      sortType: type ?? undefined,
      customSortFn: customSortFn ?? undefined,
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
    const { sortKey, sortOrder, sortType, customSortFn } = sortConfig;
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
      if (customSortFn) return customSortFn(valA, valB);

      // Call the correct compare function based on the sort type
      if (sortType === "date" && isValidDate(valA) && isValidDate(valB)) {
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
        } else if (typeof valA === "boolean" && typeof valB === "boolean") {
          return booleanCompareFn(valA, valB, sortOrder);
        } else if (typeof valA === "string" && typeof valB === "string") {
          return stringCompareFn(valA, valB, sortOrder);
        }
      }
      return 0;
    });
  };

  /** Update data when sortConfig change */
  useEffect(() => {
    updateTableData(sortDataFn(tableData));
  }, [sortConfig]);

  return { sortConfig, handleSortConfig, sortDataFn };
};
