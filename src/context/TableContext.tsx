import { createContext, FC, useContext, useEffect, useState } from "react";
import { TableContextInterface, TableProviderProps } from "../types";

/** Create the table context */
export const TableContext = createContext<TableContextInterface>({} as TableContextInterface);

/** Create the Table context provider */
export const TableCtxProvider: FC<TableProviderProps> = ({ children, data }) => {
  /** Store data in an independent state. It will not be modified and will be used to filter data */
  const [initialData, setInitialData] = useState<any[]>([]);
  const [tableData, updateTableData] = useState<any[]>([]);

  /** When data change, update the initial data and the table data */
  useEffect(() => {
    setInitialData(data);
    updateTableData(data);
  }, [data]);

  const value: TableContextInterface = {
    tableData,
    initialData,
    updateTableData,
    resetTableData: (): void => updateTableData(initialData),
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

/** ShortCut to use the table context */
export const useTableCtx = () => useContext(TableContext);
