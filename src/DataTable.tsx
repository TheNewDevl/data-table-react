import { TableCtxProvider } from "./context/TableContext";
import { noMissingDataEmployees } from "./mocks/mockEmployees";
import { Table } from "./Table";
import { FC } from "react";
import { DataTableProps } from "./types";

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
export const DataTable: FC<DataTableProps> = ({ data, columns, config }) => {
  return (
    <TableCtxProvider data={data ?? noMissingDataEmployees}>
      <Table columns={columns} config={config} />
    </TableCtxProvider>
  );
};
