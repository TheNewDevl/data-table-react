import { createContext, FC, useContext, useEffect, useState } from "react";
import { TableContextInterface, TableProviderProps } from "../types";

/** Create the table context */
export const TableContext = createContext<TableContextInterface>({} as TableContextInterface);

/** Create the Table context provider */
export const TableCtxProvider: FC<TableProviderProps> = ({ children }) => {
  const [initialData, setInitialData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  /** When initial data change, filtered data will be updated too */
  useEffect(() => {
    setFilteredData(initialData);
  }, [initialData]);

  /** The given array will update the initial data table state */
  const updateInitialData = (data: any[]): void => setInitialData(data);

  /** Filtered data will be equal to the initial data if the search term is empty */
  const resetFilteredData = (): void => setFilteredData(initialData);

  /** Update filtered data state */
  const updateFilteredData = (data: any[]): void => setFilteredData(data);

  const value: TableContextInterface = {
    initialData,
    filteredData,
    updateInitialData,
    resetFilteredData,
    updateFilteredData,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

/** ShortCut to use the table context */
export const useTableCtx = () => useContext(TableContext);
