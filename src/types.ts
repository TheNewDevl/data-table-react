import { ChangeEvent, PropsWithChildren } from "react";

//ctx
export interface TableProviderProps extends PropsWithChildren {}
export interface TableContextInterface {
  initialData: any[];
  filteredData: any[];
  updateInitialData: (data: any[]) => void;
  resetFilteredData: () => void;
  updateFilteredData: (data: any[]) => void;
}

//colmuns
export type DataKey = string;
export interface ColumnType {
  title: string;
  data: DataKey;
}

//Data table component
export interface DataTableConfig {
  search: boolean;
}
export interface DataTableProps {
  data: { [key: string]: any }[];
  columns: { title: string; data: string }[];
  config?: DataTableConfig;
}

// Search Hook
export interface SearchHookProps {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}
