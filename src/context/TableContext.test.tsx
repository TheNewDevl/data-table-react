import { TableContext, TableCtxProvider, useTableCtx } from "./TableContext";
import { FC } from "react";
import { fireEvent, render } from "@testing-library/react";

const FakeComponent: FC = ({}) => {
  const { filteredData, initialData, updateInitialData, resetFilteredData, updateFilteredData } = useTableCtx();
  return (
    <div>
      <div data-testid="initialData">{initialData.length}</div>
      <div data-testid="filteredData">{filteredData.length}</div>
      <button data-testid="updateInitialData" onClick={() => updateInitialData([1, 2, 3])} />
      <button data-testid="resetFilteredData" onClick={resetFilteredData} />
      <button data-testid="updateFilteredData" onClick={() => updateFilteredData([1, 2, 3, 4, 5])} />
    </div>
  );
};

const setup = () => {
  return {
    ...render(
      <TableCtxProvider>
        <FakeComponent />
      </TableCtxProvider>
    ),
  };
};

describe("Table context test suite", () => {
  it("should be defined", () => {
    expect(TableContext).toBeDefined();
  });
  it("Should render", () => {
    const { getByTestId } = setup();
    expect(getByTestId("initialData").textContent).toBe("0");
    expect(getByTestId("filteredData").textContent).toBe("0");
  });

  it("should update initialData correctly", () => {
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("updateInitialData"));
    expect(getByTestId("initialData").textContent).toBe("3");
    expect(getByTestId("filteredData").textContent).toBe("3");
  });

  it("useEffect should update filteredDate when initialData is updated", () => {
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("updateInitialData"));
    expect(getByTestId("filteredData").textContent).toBe("3");
  });

  it("should update filteredData correctly", () => {
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("updateInitialData"));
    fireEvent.click(getByTestId("updateFilteredData"));
    expect(getByTestId("initialData").textContent).toBe("3");
    expect(getByTestId("filteredData").textContent).toBe("5");
  });

  it("should reset filteredData correctly", () => {
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("updateFilteredData"));
    expect(getByTestId("filteredData").textContent).toBe("5");
    fireEvent.click(getByTestId("resetFilteredData"));
    expect(getByTestId("initialData").textContent).toBe("0");
  });
});
