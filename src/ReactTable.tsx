import { FC, useEffect, useMemo } from "react";
import { useTableCtx } from "./context/TableContext";
import { DataTableConfig, DataTableProps } from "./types";
import { useSearch } from "./hooks/useSearch";
import { usePagination } from "./hooks/usePagination";
import { Pagination } from "./components/Pagination/Pagination";
import { useSort } from "./hooks/useSort";
import { isValidDate } from "./functions/dates/dates";

const defaultConfig: DataTableConfig = {
  search: true,
  pagination: true,
  rowsPerPageOptions: [2, 25, 50],
  sortable: true,
  country: "fr-FR",
};

/**
 * #DataTable component
 *
 * ## How to use it (informations about the props)
 *
 * ### data (required) : Object[]
 * - Each object in the array will represent a row in the table.
 * - Each object should have the same keys.
 *
 * ### columns (required) : Object[]
 * Each object will represent a columns.
 *
 *
 * 2 required keys for each object:
 * - key: the key of the object in the data array
 * - title: the title of the column ( will be displayed in the header )
 *
 *
 * 1 key is optional:
 * - type: the type of the column. It can be "date", "number" or "string". I strongly recommend to use it especially for date columns.
 *
 * ### config (optional) : Object
 * The configuration object is optional. If you don't provide it, the table will use the default configuration.
 * If you want to override only some properties of the default configuration, you can provide only the properties you want to override.
 *
 * @param data The data to display in the table.
 * @param columns The columns to display in the table.
 * @param config - The configuration object of the table.
 * @returns The DataTable component
 *
 * @example
 * ```jsx
 * import { DataTable } from "data-tables-react";
 *
 * const columns = [
 *   { title: "First Name", data: "firstName" },
 *   { title: "Last Name", data: "lastName" },
 *   { title: "Birth date", data: "birthDate", type: "date" },
 * ];
 *
 * const data = [
 *  { firstName: "John", lastName: "Doe", birthDate: "1990-01-01" },
 *  { firstName: "Jane", lastName: "Doe", birthDate: "1990-01-02" },
 *  { firstName: "John", lastName: "Doe", birthDate: "1990-01-03" },
 * ]
 *
 * const config = {
 *  pagination: true,
 *  rowsPerPageOptions: [10, 25, 50],
 *  country: "fr-FR",
 * };
 *
 * const App = () => <DataTable data={employees} columns={columns} />
 *
 * export default App;
 *  ```
 *
 */
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
