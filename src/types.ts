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

// Columns
export type DataKey = string;
export interface ColumnType {
  title: string;
  data: DataKey;
  type?: SortConfig["sortType"];
}

//Data table component
export interface DataTableConfig {
  search: boolean;
  pagination: boolean;
  rowsPerPageOptions: number[];
  sortable: boolean;
  country: string;
}
export interface DataTableProps {
  data: { [key: string]: any }[];
  columns: { title: string; data: string; type?: SortConfig["sortType"] }[];
  config?: Partial<DataTableConfig>;
}

// Search Hook
export interface SearchHookReturn {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Pagination hook
export interface PaginationValues {
  currentPage: number;
  rowsPerPage: number;
  paginatedData: any[] | undefined;
  rowsPerPageOpts: number[] | undefined;
  totalPages: number;
  pageButtons: any[];
  isActive: (page?: number) => boolean;
}
export interface PaginationHandlers {
  selectPage: (page: number) => void;
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLSelectElement>) => void;
  incrementPage: () => void;
  decrementPage: () => void;
}
export interface PaginationHookReturn {
  paginationValues: PaginationValues;
  paginationHandlers: PaginationHandlers;
}
export interface PaginationProps {
  columns: number;
  values: PaginationValues;
  handlers: PaginationHandlers;
  dataLength: number;
}
export interface PaginationButtonsProps {
  values: PaginationValues;
  handlers: PaginationHandlers;
}

// Sort hook
export interface SortConfig {
  sortKey: string;
  sortOrder: "asc" | "desc";
  sortType: "string" | "number" | "date" | undefined;
}
export interface SortHookReturn {
  sortConfig: SortConfig;
  handleSortConfig: (key: string, type?: SortConfig["sortType"]) => void;
  sortDataFn: (data: any[]) => any[];
}
export type SortCompareFn = (a: any, b: any, sortOrder?: SortConfig["sortOrder"]) => number;
