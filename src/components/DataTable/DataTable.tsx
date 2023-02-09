import { TableCtxProvider } from "../../context/TableContext";
import { Table } from "../Table/Table";
import { FC } from "react";
import { DataTableProps } from "../../types/types";

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
 * 2 key are optional:
 * - type: the type of the column. It can be "date", "number" or "string". I strongly recommend to use it especially for date columns.
 * - customSortFn: a custom sort function for the column. It will override the default sort function. It will be called with 2 arguments: the 2 values to compare. sortOrder will be ignored
 *
 * ### config (optional) : Object
 * The configuration object is optional. If you don't provide it, the table will use the default configuration.
 * If you want to override only some properties of the default configuration, you can provide only the properties you want to override.
 *
 * @param data The data to display in the table.
 * @param columns The columns to display in the table.
 * @param config - The configuration object of the table.
 * @param wrapperClassName -  Add a class to the wrapper div of the component.
 * @param tableClassName -  Add a class to the div that contains the table.
 * @param searchWrapperClassName -  Add a class to the div that contains the search input.
 * @param tfootClassName -  Add a class to footer of the table.
 * @param paginationWrapperClassName -  Add a class to the div that contains the pagination buttons and the text "Showing...".
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
 * const App = () => <Table data={employees} columns={columns} config={config} />
 *
 * export default App;
 *  ```
 *
 */
export const DataTable: FC<DataTableProps> = ({
  data,
  columns,
  config,
  wrapperClassName,
  tableClassName,
  searchWrapperClassName,
  tfootClassName,
  paginationWrapperClassName,
}) => {
  if (!data) {
    console.error("You didn't provide any data to the table.");
    return <p>You didn't provide any data to the table</p>;
  } else if (!Array.isArray(data)) {
    console.error("The data you provided is not an array.");
    return <p>The data you provides is not an array</p>;
  } else {
    // check if the data is an array of objects
    if (!columns && data.every((item) => item instanceof Object)) {
      console.warn("You didn't provide any columns to the table. So the table will create columns from the data.");
      // create columns from the data
      columns = Object.keys(data[0]).map((key) => ({ title: key, data: key }));
    } else if (!columns) {
      console.error("You didn't provide any columns to the table and the data is not an array of objects.");
      return (
        <p>
          You didn't provide any columns to the table and the data is not an array of objects. So it's not possible to
          extract columns"
        </p>
      );
    } else if (
      columns &&
      columns.every((item) => item instanceof Object && item.data && item.title) &&
      !data.every((item) => item instanceof Object)
    ) {
      // If the data is not an array of objects but the columns are, we try to parse the data to match the columns
      const transformedData = [];
      const numberOfColumns = columns.length;
      for (let i = 0; i < data.length; i += numberOfColumns) {
        const obj: { [key: string]: any } = {};
        for (let j = 0; j < numberOfColumns; j++) {
          obj[columns[j].data] = data[i + j];
        }
        transformedData.push(obj);
      }
      data = transformedData;
      if (data.length % numberOfColumns !== 0) {
        console.warn("The data you provided doesn't match the columns.");
      }
    }

    return (
      <TableCtxProvider data={data}>
        <Table
          columns={columns}
          config={config}
          tfootClassName={tfootClassName}
          paginationWrapperClassName={paginationWrapperClassName}
          wrapperClassName={wrapperClassName}
          searchWrapperClassName={searchWrapperClassName}
          tableClassName={tableClassName}
        />
      </TableCtxProvider>
    );
  }
};
