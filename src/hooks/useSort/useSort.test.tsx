import { describe, expect, it, vi } from "vitest";
import { useSort } from "./useSort";
import { act, renderHook } from "@testing-library/react";
import { TableCtxProvider } from "../../context/TableContext";
import { dateCompareFn, numberCompareFn, stringCompareFn } from "../../functions/sort/sort";
import { SortConfig } from "../../types/types";
import { JSXElementConstructor } from "react";

const data = [
  { name: "a", age: 25, date: "01-01-2023" },
  { name: "b", age: 30, date: "01-01-2023" },
];
const setup = (config: any) => {
  const Provider = TableCtxProvider;
  Provider.defaultProps = { data };
  return {
    ...renderHook(() => useSort(config), { wrapper: Provider as JSXElementConstructor<any> }),
  };
};

describe("useSort tests suit", () => {
  vi.mock("../../functions/sort/sort", () => ({
    numberCompareFn: vi.fn(),
    stringCompareFn: vi.fn(),
    dateCompareFn: vi.fn(),
  }));
  it("should return sortConfig, handleSortConfig, sortDataFn ", () => {
    const { result } = setup({ sortable: true });
    expect(result.current.sortConfig).toEqual({ sortKey: "", sortOrder: "asc" });
    expect(typeof result.current.handleSortConfig).toBe("function");
    expect(typeof result.current.sortDataFn).toBe("function");
  });

  it("should update sort config properly", () => {
    const { result } = setup({ sortable: true });
    const sortKey = "name";
    const sortType = "date";
    act(() => {
      result.current.handleSortConfig(sortKey, sortType);
    });
    expect(result.current.sortConfig).toEqual({ sortKey, sortType, sortOrder: "asc" });
    act(() => {
      result.current.handleSortConfig(sortKey, sortType);
    });
    expect(result.current.sortConfig).toEqual({ sortKey, sortType, sortOrder: "desc" });
    act(() => {
      result.current.handleSortConfig(sortKey, undefined);
    });
    expect(result.current.sortConfig).toEqual({ sortKey, sortOrder: "asc" });
  });

  it("should call numberCompareFn", () => {
    const sortKey = "age";
    const sortType: SortConfig["sortType"] = "number";

    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, sortType));
    result.current.sortDataFn(data);

    expect(numberCompareFn).toHaveBeenCalledWith(data[1][sortKey], data[0][sortKey], "asc");
    expect(stringCompareFn).not.toHaveBeenCalled();
    expect(dateCompareFn).not.toHaveBeenCalled();
  });

  it("should call dateCompareFn", () => {
    const sortKey = "date";
    const sortType: SortConfig["sortType"] = "date";

    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, sortType));
    result.current.sortDataFn(data);

    expect(numberCompareFn).not.toHaveBeenCalled();
    expect(stringCompareFn).not.toHaveBeenCalled();
    expect(dateCompareFn).toHaveBeenCalledWith(data[1][sortKey], data[0][sortKey], "asc");
  });
  it("should call stringCompareFn", () => {
    const sortKey = "age";
    const sortType: SortConfig["sortType"] = "string";

    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, sortType));
    result.current.sortDataFn(data);

    expect(numberCompareFn).not.toHaveBeenCalled();
    expect(stringCompareFn).toHaveBeenCalledWith(data[1][sortKey], data[0][sortKey], "asc");
    expect(dateCompareFn).not.toHaveBeenCalled();
  });

  it("should call numberCompareFn even if sortType is undefined if values are numbers", () => {
    const sortKey = "age";

    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, undefined));
    result.current.sortDataFn(data);

    expect(numberCompareFn).toHaveBeenCalledWith(data[1][sortKey], data[0][sortKey], "asc");
    expect(stringCompareFn).not.toHaveBeenCalled();
    expect(dateCompareFn).not.toHaveBeenCalled();
  });

  it("should call dataCompare even if sortType is undefined if values are detected as dates", () => {
    const sortKey = "date";

    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, undefined));
    result.current.sortDataFn(data);

    expect(numberCompareFn).not.toHaveBeenCalled();
    expect(stringCompareFn).not.toHaveBeenCalled();
    expect(dateCompareFn).toHaveBeenCalledWith(data[1][sortKey], data[0][sortKey], "asc");
  });

  it("should call stringCompareFn if sortType is undefined and values are not numbers or dates ", () => {
    const sortKey = "name";

    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, undefined));
    result.current.sortDataFn(data);

    expect(numberCompareFn).not.toHaveBeenCalled();
    expect(stringCompareFn).toHaveBeenCalledWith(data[1][sortKey], data[0][sortKey], "asc");
    expect(dateCompareFn).not.toHaveBeenCalled();
  });

  it("should return string default value if value si not defined and sortType is also undefined", () => {
    let sortKey = "invalid";
    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, undefined));
    result.current.sortDataFn(data);
    expect(stringCompareFn).toHaveBeenCalledWith("ZZZZ", "ZZZZ", "asc");
  });

  it("should return number default value", () => {
    let sortKey = "invalid";
    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, "number"));
    result.current.sortDataFn(data);
    expect(numberCompareFn).toHaveBeenCalledWith(0, 0, "asc");
  });
  it("should return date default value", () => {
    let sortKey = "invalid";
    const { result } = setup({ sortable: true });
    act(() => result.current.handleSortConfig(sortKey, "date"));
    result.current.sortDataFn(data);
    expect(dateCompareFn).toHaveBeenCalledWith("01/01/111", "01/01/111", "asc");
  });

  it("should not sort Data if table is not sortable ", () => {
    const { result } = setup({ sortable: false });
    act(() => result.current.handleSortConfig("sortKey", undefined));
    const sortedData = result.current.sortDataFn(data);

    expect(numberCompareFn).not.toHaveBeenCalled();
    expect(stringCompareFn).not.toHaveBeenCalled();
    expect(dateCompareFn).not.toHaveBeenCalled();
    expect(sortedData).toEqual(data);
  });
});
