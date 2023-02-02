import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useSearch } from "./useSearch";
import { TableCtxProvider, useTableCtx } from "../context/TableContext";
import { ChangeEvent, FC } from "react";
import { DataTableConfig } from "../types";

const initialDatas = [
  { name: "John", age: 25 },
  { name: "Doe", age: 30 },
  { name: "Jane", age: 20 },
  { name: "Doe", age: 30 },
  { name: "John", age: 25 },
];

const FakeComponent: FC<{ config: Partial<DataTableConfig>; sortData?: (data: any[]) => any[] }> = ({
  config,
  sortData,
}) => {
  const { filteredData, initialData, updateInitialData } = useTableCtx();
  const { searchTerm, handleSearch } = useSearch(config, sortData);
  return (
    <div>
      <input type="text" data-testid="input" value={searchTerm} onChange={handleSearch} />
      <p data-testid="searchTerm">{searchTerm}</p>
      <button data-testid="handleConfig" onClick={() => (config.search = !config.search)}></button>
      <div data-testid="initialData">{initialData.length}</div>
      <div data-testid="filteredData">{filteredData.length}</div>
      <button data-testid="updateInitialData" onClick={() => updateInitialData(initialDatas)} />
    </div>
  );
};

const setup = (config: Partial<DataTableConfig>, sortData?: (data: any[]) => any[]) => {
  return {
    ...render(
      <TableCtxProvider>
        <FakeComponent config={config} sortData={sortData} />
      </TableCtxProvider>
    ),
  };
};

describe("useSearch hook test suit", () => {
  it("should return searchTerm and handle search function", () => {
    const { result } = renderHook(() => useSearch({ search: true }), { wrapper: TableCtxProvider });
    expect(result.current.searchTerm).toBe("");
    expect(typeof result.current.handleSearch).toBe("function");
  });

  it("should update the searchTerm when handleSearch is used", () => {
    const { result } = renderHook(() => useSearch({ search: true }), { wrapper: TableCtxProvider });
    const searchTerm = "new term";
    const event = { target: { value: searchTerm } } as ChangeEvent<HTMLInputElement>;
    act(() => {
      result.current.handleSearch(event);
    });
    expect(result.current.searchTerm).toBe(searchTerm);
  });

  it("should update filteredData when search term change and table is sortable", () => {
    const { getByTestId } = setup({ search: true });
    const searchTerm = "25";

    fireEvent.click(getByTestId("updateInitialData"));
    expect(getByTestId("filteredData").textContent).toBe(initialDatas.length.toString());

    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: searchTerm } });
    expect(getByTestId("searchTerm").textContent).toBe(searchTerm);
    expect(getByTestId("filteredData").textContent).toBe("2");
  });

  it("should not update filteredData when table is not sortable", () => {
    const { getByTestId } = setup({ search: false });
    const searchTerm = "25";

    fireEvent.click(getByTestId("updateInitialData"));
    expect(getByTestId("filteredData").textContent).toBe(initialDatas.length.toString());

    const input = getByTestId("input");
    fireEvent.change(input, { target: { value: searchTerm } });
    expect(getByTestId("filteredData").textContent).toBe(initialDatas.length.toString());
  });

  it("should update filtered data using sortData fn if provided", () => {
    const mockSortDataFn = vi.fn().mockImplementation((data) => data);
    setup({ search: true }, mockSortDataFn);
    expect(mockSortDataFn).toHaveBeenCalledOnce();
  });

  it("should not update filtered data using sortData fn if not provided", () => {
    const mockSortDataFn = vi.fn().mockImplementation((data) => data);
    setup({ search: true });
    expect(mockSortDataFn).not.toHaveBeenCalled();
  });

  it("should ", () => {
    const config = { search: true };
    const mockDispatchEvent = vi.fn();
    const dispatchSpy = vi
      .spyOn(window, "dispatchEvent")
      .mockImplementation((event: Event) => mockDispatchEvent(event));

    const { result } = renderHook(() => useSearch(config), { wrapper: TableCtxProvider });
    act(() => result.current.handleSearch({ target: { value: "test" } } as ChangeEvent<HTMLInputElement>));
    expect(dispatchSpy).toHaveBeenCalledWith(new CustomEvent("filter"));
  });
});
