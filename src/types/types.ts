import { ChangeEvent, PropsWithChildren } from "react";

//ctx
export interface TableProviderProps extends PropsWithChildren {
  data: any[];
}
export interface TableContextInterface {
  initialData: any[];
  tableData: any[];
  updateTableData: (data: any[]) => void;
  resetTableData: () => void;
}

// Columns
export type DataKey = string;
export interface ColumnType {
  title: string;
  data: DataKey;
  type?: SortConfig["sortType"];
  customSortFn?: ((a: any, b: any) => number) | undefined;
}

//Data table component
export interface DataTableConfig {
  search: boolean;
  pagination: boolean;
  rowsPerPageOptions: number[];
  sortable: boolean;
  dates: {
    format: "long" | "short" | "numeric" | "2-digit";
    country: string;
  };
}
export interface DataTableProps {
  data: any[];
  columns: {
    title: string;
    data: string;
    type?: SortConfig["sortType"];
    customSortFn?: ((a: any, b: any) => number) | undefined;
  }[];
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
  customSortFn: ((a: any, b: any) => number) | undefined;
}
export interface SortHookReturn {
  sortConfig: SortConfig;
  handleSortConfig: (
    key: string,
    type: SortConfig["sortType"],
    customSortFn?: ((a: any, b: any) => number) | undefined
  ) => void;
  sortDataFn: (data: any[]) => any[];
}
export type SortCompareFn = (a: any, b: any, sortOrder?: SortConfig["sortOrder"]) => number;
