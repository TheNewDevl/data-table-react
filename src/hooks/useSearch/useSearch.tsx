import { DataTableConfig, SearchHookReturn } from "../../types";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useTableCtx } from "../../context/TableContext";

/** Search hook
 * @param config - The table config
 * @param sortData - The function used to sort data (if the table is sortable)
 * If the search is enabled, the hook will update the filtered data state using the search term
 * Data will also be passed in the sort function if the table is sortable
 */
export const useSearch = (config: Partial<DataTableConfig>, sortData?: (data: any[]) => any[]): SearchHookReturn => {
  /** Get the context */
  const { initialData, updateFilteredData, resetFilteredData } = useTableCtx();
  /** Search term state */
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Update the search term state using the input target value
   * @param event - The input change event
   */
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.trim());
  };

  /** Filter the data using the search term. Will only recompute if initial data or search term change */
  const filteredData = useMemo(() => {
    if (config.search && searchTerm) {
      return [...initialData].filter((item: { [key: string]: any }) =>
        Object.values(item).some((val) => val.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      return initialData;
    }
  }, [initialData, searchTerm]);

  /**
   * When filteredData change, the filteredData state will be updated
   * Also pass the data into the sort function if the table is sortable
   * If config is turn off, reset the filtered data
   */
  useEffect(() => {
    if (config.search) {
      updateFilteredData(sortData ? sortData(filteredData) : filteredData);
      const filterEvent = new CustomEvent("filter");
      dispatchEvent(filterEvent);
    } else {
      resetFilteredData();
    }
  }, [filteredData, config]);

  return { searchTerm, handleSearch };
};
