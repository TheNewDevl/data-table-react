import { PaginationProps } from "../../types/types";
import { expect, it, describe } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { mockUsePagination } from "../../tests/mocks/paginationHook";
import { mockEmployees } from "@fromjquerytoreact/client/src/utils/mocks";

export const setup = (props: Partial<PaginationProps> = {}) => {
  const { values, handlers } = mockUsePagination();
  const defaultProps: PaginationProps = {
    columns: 5,
    dataLength: 20,
    values,
    handlers,
  };
  const allProps = { ...defaultProps, ...props };
  const resRender = render(<Pagination {...allProps} />);
  return { ...resRender, ...allProps };
};

describe("Pagination component test suite", () => {
  it("should render a pagination component", () => {
    const { getByTestId } = setup();
    const pagination = getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });

  it("should set calSpan attribute", () => {
    const { getByTestId, columns } = setup();
    const pagination = getByTestId("pagination");
    expect(pagination.firstElementChild).toHaveAttribute("colSpan", columns.toString());
  });

  it("should render a select with the correct number of options", () => {
    const { getByRole, values } = setup();
    const select = getByRole("listbox");
    expect(select).toBeInTheDocument();
    expect(select.children.length).toBe(values.rowsPerPageOpts!.length);
    [...select.children].forEach((option, index) => {
      expect(option).toHaveTextContent(values.rowsPerPageOpts![index].toString());
    });
  });

  it("should show Showing 0 entries if paginatedData is empty", () => {
    const { values, handlers } = mockUsePagination();
    values.paginatedData = [];
    const { getByText, dataLength } = setup({ values, handlers });
    const span = getByText(/Showing 0 entries/i);
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent(`Showing 0 entries (filtered from ${dataLength} entries)`);
  });

  it("should show the correct number of items", () => {
    const { values, handlers } = mockUsePagination();
    values.paginatedData = [...mockEmployees];
    const { getByText, dataLength } = setup({ values, handlers });
    const span = getByText(/Showing/i);
    expect(span).toBeInTheDocument();

    const { rowsPerPage, currentPage } = values;
    const start = currentPage * rowsPerPage - rowsPerPage + 1;
    const end = currentPage * rowsPerPage - (rowsPerPage - values.paginatedData.length);
    expect(span).toHaveTextContent(`Showing ${start} to ${end} of ${dataLength} entries`);
  });

  it("should change the number of rows when a option is selected", () => {
    const { values } = mockUsePagination();
    values.paginatedData = [...mockEmployees];
    const { getByRole, handlers } = setup({ values });
    const select = getByRole("listbox");
    fireEvent.change(select, { target: { value: 8 } });
    expect(handlers.handleChangeRowsPerPage).toHaveBeenCalledOnce();
  });
});
