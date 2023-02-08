import { FC, useMemo } from "react";
import { useTableCtx } from "../../context/TableContext";
import { DataTableConfig, DataTableProps } from "../../types/types";
import { useSearch } from "../../hooks/useSearch/useSearch";
import { usePagination } from "../../hooks/usePagination/usePagination";
import { Pagination } from "../Pagination/Pagination";
import { useSort } from "../../hooks/useSort/useSort";
import { isValidDate } from "../../functions/dates/dates";

const defaultConfig: DataTableConfig = {
  search: true,
  pagination: true,
  rowsPerPageOptions: [5, 25, 50],
  sortable: true,
  dates: {
    format: "long",
    country: "fr-FR",
  },
};

/**
 * #Table component
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
 * @returns The Table component
 *
 * @example
 * ```jsx
 * import { Table } from "data-tables-react";
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
 *  date: {
 *    format: "long",
 *    country: "fr-FR",
 *  },
 * };
 *
 * const App = () => <Table data={employees} columns={columns} />
 *
 * export default App;
 *  ```
 *
 */
export const Table: FC<Omit<DataTableProps, "data">> = ({ columns, config }) => {
  /** Mix default config and props config */
  const configState: DataTableConfig = useMemo(() => ({ ...defaultConfig, ...config }), [defaultConfig, config]);

  /** Get the context */
  const { tableData } = useTableCtx();

  /** Use the useSort hook */
  const { sortConfig, handleSortConfig, sortDataFn } = useSort(configState);

  /** Use the useSearch hook */
  const { searchTerm, handleSearch } = useSearch(configState, configState.sortable ? sortDataFn : undefined);

  /** Use the usePagination hook */
  const { paginationValues, paginationHandlers } = usePagination(
    configState.rowsPerPageOptions,
    configState,
    tableData
  );

  const sortIndicator = (columnKey: string) =>
    sortConfig.sortKey === columnKey && (sortConfig.sortOrder === "asc" ? "↑" : "↓");
  const sortIndicatorAria = (columnKey: string) =>
    sortConfig.sortOrder === "asc" && sortConfig.sortKey === columnKey ? "descending" : "ascending";

  const handleHeaderClickAndKeyDown = (e: any, columnKey: string, columnType: SortConfig["sortType"]) => {
    if (configState.sortable) {
      if ((e.type === "click" || (e.type === "keydown" && e.key === "Enter") || e.key === " ") && columnKey) {
        handleSortConfig(columnKey, columnType);
      }
    }
  };

  /** Render the table */
  return (
    <div>
      {configState.search && (
        <div>
          <label htmlFor="table-search">Search:</label>
          <input role={"search"} type="text" id="table-search" value={searchTerm} onChange={handleSearch} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th
                onClick={(e) => handleHeaderClickAndKeyDown(e, column.data, column.type)}
                onKeyDown={(e) => handleHeaderClickAndKeyDown(e, column.data, column.type)}
                key={index}
                tabIndex={0}
                aria-label={
                  configState.sortable ? `Click to sort ${sortIndicatorAria(column.data)} by ${column.title}` : ""
                }
              >
                {column.title} {sortIndicator(column.data)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-testid={"tbody"}>
          {(configState.pagination ? paginationValues.paginatedData : tableData)?.map((row, index) => (
            <tr key={index}>
              {columns?.map((column, index) => {
                if (column.type === "date" && isValidDate(row[column.data])) {
                  const dateFormat = new Intl.DateTimeFormat(configState.dates.country, {
                    year: "numeric",
                    month: configState.dates.format,
                    day: "2-digit",
                  }).format(new Date(row[column.data]));
                  return (
                    <td tabIndex={0} key={index}>
                      {dateFormat}
                    </td>
                  );
                } else {
                  return (
                    <td tabIndex={0} key={index}>
                      {row[column.data]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
        {configState.pagination && (
          <tfoot data-testid="tfoot">
            <Pagination
              values={paginationValues}
              handlers={paginationHandlers}
              columns={columns.length}
              dataLength={tableData.length}
            />
          </tfoot>
        )}
      </table>
    </div>
  );
};
