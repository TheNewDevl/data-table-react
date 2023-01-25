import { FC, useEffect } from "react";
import { useTableCtx } from "./context/TableContext";
import { DataTableProps } from "./types";
import { useSearch } from "./hooks/useSearch";

const defaultConfig = {
  search: true,
};

export const DataTable: FC<DataTableProps> = ({ data, columns, config = { ...defaultConfig } }) => {
  /** Get the context */
  const { filteredData, updateInitialData } = useTableCtx();

  /** Save the props data in the context */
  useEffect(() => updateInitialData(data), []);

  /** Use the useSearch hook */
  const { searchTerm, handleSearch } = useSearch(config);

  /** Render the table */
  return (
    <div>
      {config.search && (
        <div>
          <label htmlFor="table-search">Search:</label>
          <input type="text" id="table-search" value={searchTerm} onChange={handleSearch} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index}>{row[column.data]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
