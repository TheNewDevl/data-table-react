import { PaginationButtonsProps } from "../../types";
import { FC } from "react";

/**
 * Pagination Buttons component
 * It is responsible for rendering the pagination buttons
 * @param columns - The number of columns in the table (used to set the colspan of the table row)
 * @param values - The values used to render the pagination buttons (current page, number of rows per page, etc) from usePagination hook
 * @param handlers - The handlers used to change the pagination values from usePagination hook
 */
export const PaginationButtons: FC<PaginationButtonsProps> = ({
  values,
  handlers,
}: PaginationButtonsProps): JSX.Element => {
  const { pageButtons, currentPage, isActive } = values;
  const { selectPage, incrementPage, decrementPage } = handlers;

  return (
    <div data-testid="pages-buttons">
      <button disabled={currentPage === 1} onClick={decrementPage}>
        Previous
      </button>
      {pageButtons.map((page, index) => {
        return page === "..." ? (
          <span key={index}>{page}</span>
        ) : (
          <button disabled={isActive(page)} key={index} onClick={() => selectPage(page)}>
            {page}
          </button>
        );
      })}
      <button disabled={isActive()} onClick={incrementPage}>
        Next
      </button>
    </div>
  );
};

/** Created by carlos on 26/01/2023 */
