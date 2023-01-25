import { PropsWithChildren } from "react";

//ctx
export interface TableProviderProps extends PropsWithChildren {}
export interface TableContextInterface {
  data: any[];
  updateData: (data: any[]) => void;
}

//colmuns
export type DataKey = string;
export interface ColumnType {
  title: string;
  data: DataKey;
}

//Data table component
export interface DataTableProps {
  data: { [key: string]: any }[];
  columns: { title: string; data: string }[];
  config?: {};
}
