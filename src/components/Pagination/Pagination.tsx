import { FC } from "react";
import { PaginationProps } from "../../types";
import { PaginationButtons } from "../PaginationButtons/PaginationButtons";

/**
 * Pagination component
 * It is responsible for rendering the pagination buttons, a select to change the number of rows per page and the number of items displayed
 * @param columns - The number of columns in the table (used to set the colspan of the table row)
 * @param values - The values used to render the pagination buttons (current page, number of rows per page, etc) from usePagination hook
 * @param handlers - The handlers used to change the pagination values from usePagination hook
 * @param dataLength - The length of the data array
 */
export const Pagination: FC<PaginationProps> = ({ columns, handlers, values, dataLength }): JSX.Element => {
  /** Get pagination value */
  const { rowsPerPage, currentPage, paginatedData, rowsPerPageOpts } = values;
  /** Get pagination handlers */
  const { handleChangeRowsPerPage } = handlers;

  return (
    <tr>
      <td colSpan={columns}>
        <div>
          <span>Rows per page:</span>
          <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            {rowsPerPageOpts?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          {paginatedData?.length ? (
            <span>
              Showing {currentPage * rowsPerPage - rowsPerPage + 1} to{" "}
              {currentPage * rowsPerPage - (rowsPerPage - paginatedData.length)} of {dataLength} entries
            </span>
          ) : (
            <span>Showing 0 entries (filtered from {dataLength} entries)</span>
          )}
          <PaginationButtons values={values} handlers={handlers} />
        </div>
      </td>
    </tr>
  );
};

/** Created by carlos on 25/01/2023 */
