import { createContext, FC, useContext, useState } from "react";
import { TableContextInterface, TableProviderProps } from "../types";

/** Create the table context */
export const TableContext = createContext<TableContextInterface>({} as TableContextInterface);

/** Create the Table context provider */
export const TableCtxProvider: FC<TableProviderProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);

  const updateData = (data: any[]): void => {
    setData(data);
  };
  const value: TableContextInterface = { data, updateData };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

/** ShortCut to use the table context */
export const useTableCtx = () => useContext(TableContext);
