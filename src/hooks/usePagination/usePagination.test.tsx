import { describe, it, vi } from "vitest";
import { DataTableConfig } from "../../types/types";
import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";
import { noMissingDataEmployees } from "../../mocks/mockEmployees";
import { ChangeEvent } from "react";
import { calculateTotalPages, getButtons } from "./functions";

const TestComponent = ({ children }: any) => <div>{children}</div>;
const setup = (data: any[], config: Partial<DataTableConfig>, rowsPerPageOpts?: number[]) => ({
  ...renderHook(() => usePagination(rowsPerPageOpts ?? [5, 10, 20], { pagination: true }, data), {
    wrapper: TestComponent,
  }),
});
const config = { pagination: true };

describe("usePagination test suite", () => {
  it("Should return default values", () => {
    const { result } = setup(noMissingDataEmployees, config);
    const { paginationValues, paginationHandlers } = result.current;
    const { decrementPage, incrementPage, selectPage, handleChangeRowsPerPage } = paginationHandlers;
    const { currentPage, rowsPerPage, rowsPerPageOpts, totalPages, pageButtons, isActive, paginatedData } =
      paginationValues;

    expect(currentPage).toBe(1);
    expect(rowsPerPage).toBe(5);
    expect(rowsPerPageOpts).toEqual([5, 10, 20]);
    expect(totalPages).toBe(4);
    expect(pageButtons).toEqual([1, 2, 3, 4]);
    expect(Array.isArray(paginatedData) && paginatedData.length === 5).toBe(true);

    expect(typeof decrementPage).toBe("function");
    expect(typeof incrementPage).toBe("function");
    expect(typeof selectPage).toBe("function");
    expect(typeof handleChangeRowsPerPage).toBe("function");
    expect(typeof isActive).toBe("function");
  });

  it("Should be 0", () => {
    const result = renderHook(() => usePagination(undefined, { pagination: true }, noMissingDataEmployees));
    expect(result.result.current.paginationValues.totalPages).toBe(1);
    expect(result.result.current.paginationValues.rowsPerPage).toBe(0);
  });

  it("Should have a different value if pagination is set to false", () => {
    const result = renderHook(() => usePagination(undefined, { pagination: false }, noMissingDataEmployees));
    expect(result.result.current.paginationValues.paginatedData).toBe(undefined);
    expect(result.result.current.paginationValues.totalPages).toBe(0);
  });

  it("Should increment page number only if < total pages", () => {
    const { result } = setup(noMissingDataEmployees, config);
    act(() => result.current.paginationHandlers.incrementPage());
    expect(result.current.paginationValues.currentPage).toBe(2);
    act(() => result.current.paginationHandlers.incrementPage());
    act(() => result.current.paginationHandlers.incrementPage());
    act(() => result.current.paginationHandlers.incrementPage());
    expect(result.current.paginationValues.currentPage).toBe(4);
  });

  it("Should decrement page number only if current page > 1", () => {
    const { result } = setup(noMissingDataEmployees, config);
    act(() => result.current.paginationHandlers.decrementPage());
    expect(result.current.paginationValues.currentPage).toBe(1);

    act(() => result.current.paginationHandlers.incrementPage());
    expect(result.current.paginationValues.currentPage).toBe(2);

    act(() => result.current.paginationHandlers.decrementPage());
    expect(result.current.paginationValues.currentPage).toBe(1);
  });

  it("Should set current page if page exists", () => {
    const { result } = setup(noMissingDataEmployees, config);
    act(() => result.current.paginationHandlers.selectPage(3));
    expect(result.current.paginationValues.currentPage).toBe(3);
    act(() => result.current.paginationHandlers.selectPage(10));
    expect(result.current.paginationValues.currentPage).toBe(3);
  });

  it("should change the rows per page state and set current page to one", () => {
    const { result } = setup(noMissingDataEmployees, config);
    act(() => result.current.paginationHandlers.selectPage(3));
    expect(result.current.paginationValues.currentPage).toBe(3);

    act(() =>
      result.current.paginationHandlers.handleChangeRowsPerPage({
        target: { value: "10" },
      } as ChangeEvent<HTMLSelectElement>)
    );
    expect(result.current.paginationValues.rowsPerPage).toBe(10);
    expect(result.current.paginationValues.currentPage).toBe(1);
    expect(result.current.paginationValues.totalPages).toBe(2);
  });

  it("should not be able to set rowsPerPage value to 0", () => {
    const { result } = setup(noMissingDataEmployees, config);
    act(() =>
      result.current.paginationHandlers.handleChangeRowsPerPage({
        target: { value: "0" },
      } as ChangeEvent<HTMLSelectElement>)
    );
    expect(result.current.paginationValues.rowsPerPage).toBe(5);
    act(() =>
      result.current.paginationHandlers.handleChangeRowsPerPage({
        target: { value: "5" },
      } as ChangeEvent<HTMLSelectElement>)
    );
    expect(result.current.paginationValues.rowsPerPage).toBe(5);
  });

  it("should return if page is active ", () => {
    const { result } = setup(noMissingDataEmployees, config);
    act(() => result.current.paginationHandlers.selectPage(3));
    expect(result.current.paginationValues.isActive(3)).toBe(true);
    expect(result.current.paginationValues.isActive(4)).toBe(false);
    expect(result.current.paginationValues.isActive()).toBe(false);
    act(() => result.current.paginationHandlers.selectPage(4));
    expect(result.current.paginationValues.isActive()).toBe(true);
  });

  it("should add and remove event listener", () => {
    const addEventListener = vi.spyOn(window, "addEventListener");
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { unmount } = setup(noMissingDataEmployees, config);
    expect(addEventListener).toHaveBeenCalledWith("filter", expect.any(Function));
    act(() => unmount());
    expect(removeEventListener).toHaveBeenCalledWith("filter", expect.any(Function));
  });
});

describe("getButtons", () => {
  it("should return the number of buttons corresponding to the number of total pages if pages <= 5", () => {
    expect(getButtons(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getButtons(1, 4)).toEqual([1, 2, 3, 4]);
    expect(getButtons(1, 3)).toEqual([1, 2, 3]);
    expect(getButtons(1, 2)).toEqual([1, 2]);
    expect(getButtons(1, 1)).toEqual([1]);
  });

  it("should return the 5 first pages + ... + and last page", () => {
    expect(getButtons(1, 6)).toEqual([1, 2, 3, 4, "...", 6]);
    expect(getButtons(2, 6)).toEqual([1, 2, 3, 4, "...", 6]);
    expect(getButtons(3, 20)).toEqual([1, 2, 3, 4, "...", 20]);
  });

  it("should return the 5 last pages + ... + and first page", () => {
    expect(getButtons(6, 6)).toEqual([1, "...", 3, 4, 5, 6]);
    expect(getButtons(5, 6)).toEqual([1, "...", 3, 4, 5, 6]);
    expect(getButtons(4, 6)).toEqual([1, "...", 3, 4, 5, 6]);
    expect(getButtons(20, 20)).toEqual([1, "...", 17, 18, 19, 20]);
  });

  it("should return first page, '...', prev page, current page, next page, ..., last page", () => {
    expect(getButtons(4, 10)).toEqual([1, "...", 3, 4, 5, "...", 10]);
    expect(getButtons(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
    expect(getButtons(6, 10)).toEqual([1, "...", 5, 6, 7, "...", 10]);
    expect(getButtons(7, 10)).toEqual([1, "...", 6, 7, 8, "...", 10]);
    expect(getButtons(8, 10)).toEqual([1, "...", 7, 8, 9, 10]);
  });
});

describe("calculateTotalPages", () => {
  const mockArray = (length: number) => Array.from({ length });
  it("should return 1", () => {
    expect(calculateTotalPages(mockArray(0), 10)).toBe(1);
    expect(calculateTotalPages(mockArray(0), 0)).toBe(1);
  });

  it("should return result", () => {
    expect(calculateTotalPages(mockArray(10), 10)).toBe(1);
    expect(calculateTotalPages(mockArray(11), 10)).toBe(2);
    expect(calculateTotalPages(mockArray(20), 10)).toBe(2);
    expect(calculateTotalPages(mockArray(21), 10)).toBe(3);
    expect(calculateTotalPages(mockArray(10), 5)).toBe(2);
  });
});
