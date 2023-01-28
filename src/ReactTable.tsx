import { FC, useEffect, useMemo } from "react";
import { useTableCtx } from "./context/TableContext";
import { DataTableConfig, DataTableProps } from "./types";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { Pagination } from "./components/Pagination/Pagination";
import { useSort } from "./hooks/useSort";
import { isValidDate } from "./functions/dates";

const defaultConfig: DataTableConfig = {
  search: true,
  pagination: true,
  rowsPerPageOptions: [2, 25, 50],
  sortable: true,
  country: "fr-FR",
};

export const DataTable: FC<DataTableProps> = ({ data, columns, config }) => {
  /** Mix default config and props config */
  const configState: DataTableConfig = useMemo(() => ({ ...defaultConfig, ...config }), [defaultConfig, config]);

  /** Get the context */
  const { filteredData, updateInitialData, initialData } = useTableCtx();

  /** Save the props data in the context */
  useEffect(() => updateInitialData(data), []);

  /** Use the useSort hook */
  const { sortConfig, handleSortConfig, sortDataFn } = useSort(configState);

  /** Use the useSearch hook */
  const { searchTerm, handleSearch } = useSearch(configState, configState.sortable ? sortDataFn : undefined);

  /** Use the usePagination hook */
  const { paginationValues, paginationHandlers } = usePagination(configState.rowsPerPageOptions, configState);

  const sortIndicator = (columnKey: string) =>
    sortConfig.sortKey === columnKey && (sortConfig.sortOrder === "asc" ? "↑" : "↓");

  /** Render the table */
  return (
    <div>
      {configState.search && (
        <div>
          <label htmlFor="table-search">Search:</label>
          <input type="text" id="table-search" value={searchTerm} onChange={handleSearch} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th
                onClick={() => (configState.sortable ? handleSortConfig(column.data, column.type) : null)}
                key={index}
              >
                {column.title}
                {sortIndicator(column.data)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(configState.pagination ? paginationValues.paginatedData : filteredData)?.map((row, index) => (
            <tr key={index}>
              {columns?.map((column, index) => {
                if (column.type === "date" && isValidDate(row[column.data])) {
                  const dateFormat = new Intl.DateTimeFormat(configState.country, {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(row[column.data]));
                  return <td key={index}>{dateFormat}</td>;
                } else {
                  return <td key={index}>{row[column.data]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
        {configState.pagination && (
          <tfoot>
            <Pagination
              values={paginationValues}
              handlers={paginationHandlers}
              columns={columns.length}
              dataLength={initialData.length}
            />
          </tfoot>
        )}
      </table>
    </div>
  );
};
