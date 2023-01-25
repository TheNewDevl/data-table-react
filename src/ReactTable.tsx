import { FC, useEffect } from "react";
import { useTableCtx } from "./context/TableContext";
import { DataTableProps } from "./types";

export const DataTable: FC<DataTableProps> = ({ data, columns, config }) => {
  /** Get the context */
  const { data: dataCtx, updateData } = useTableCtx();

  /** Save the props data in the context */
  useEffect(() => updateData(data), [data]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataCtx.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>{row[column.data]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
