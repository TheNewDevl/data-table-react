import { FC } from "react";
import { PaginationProps } from "../../types/types";
import { PaginationButtons } from "../PaginationButtons/PaginationButtons";

/**
 * Pagination component
 * It is responsible for rendering the pagination buttons, a select to change the number of rows per page and the number of items displayed
 * @param values - The values used to render the pagination buttons (current page, number of rows per page, etc) from usePagination hook
 * @param handlers - The handlers used to change the pagination values from usePagination hook
 * @param dataLength - The length of the data array
 * @param tfootClassName - The className of the table footer
 * @param paginationWrapperClassName - The className of the div that wraps the pagination buttons
 */
export const Pagination: FC<PaginationProps> = ({
  handlers,
  values,
  dataLength,
  tfootClassName,
  paginationWrapperClassName,
}): JSX.Element => {
  /** Get pagination value */
  const { rowsPerPage, currentPage, paginatedData, rowsPerPageOpts } = values;
  /** Get pagination handlers */
  const { handleChangeRowsPerPage } = handlers;

  return (
    <div className={`tfoot-container ${tfootClassName ?? ""}`} data-testid="pagination">
      <div>
        <label htmlFor="rowsPerPage">Rows per page :</label>
        <select id="rowsPerPage" role="listbox" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          {rowsPerPageOpts?.map((option) => (
            <option role="option" key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className={`pagination ${paginationWrapperClassName ?? ""}`}>
        {paginatedData?.length ? (
          <span tabIndex={0}>
            Showing {currentPage * rowsPerPage - rowsPerPage + 1} to{" "}
            {currentPage * rowsPerPage - (rowsPerPage - paginatedData.length)} of {dataLength} entries
          </span>
        ) : (
          <span>Showing 0 entries (filtered from {dataLength} entries)</span>
        )}
        <PaginationButtons values={values} handlers={handlers} />
      </div>
    </div>
  );
};

/** Created by carlos on 25/01/2023 */
