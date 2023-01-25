import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

/** Create the table context */
interface TableContext {
  data: any[];
  updateData: (data: any[]) => void;
}
export const TableContext = createContext<TableContext>({} as TableContext);

/** Create the Table context provider */
interface TableProviderProps extends PropsWithChildren {}

export const TableCtxProvider: FC<TableProviderProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);

  const updateData = (data: any[]): void => {
    setData(data);
  };
  const value: TableContext = { data, updateData };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

/** ShortCut to use the table context */
export const useTableCtx = () => useContext(TableContext);
