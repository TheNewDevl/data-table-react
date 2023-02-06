import { TableContext, TableCtxProvider, useTableCtx } from "./TableContext";
import { FC } from "react";
import { fireEvent, render } from "@testing-library/react";

const FakeComponent: FC = ({}) => {
  const { tableData, initialData, updateTableData, resetTableData } = useTableCtx();
  return (
    <div>
      <div data-testid="initialData">{initialData.length}</div>
      <div data-testid="tableData">{tableData.length}</div>
      <button data-testid="updateTableData" onClick={() => updateTableData([1, 2, 3, 4, 5])} />
      <button data-testid="resetTableData" onClick={resetTableData} />
    </div>
  );
};

const setup = () => {
  return {
    ...render(
      <TableCtxProvider data={[1, 2, 3]}>
        <FakeComponent />
      </TableCtxProvider>
    ),
  };
};

describe("Table context test suite", () => {
  it("should be defined and have default values", () => {
    expect(TableContext).toBeDefined();
  });
  it("Should render", () => {
    const { getByTestId } = setup();
    expect(getByTestId("initialData").textContent).toBe("3");
    expect(getByTestId("tableData").textContent).toBe("3");
  });

  it("should update tableData correctly", () => {
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("updateTableData"));
    expect(getByTestId("initialData").textContent).toBe("3");
    expect(getByTestId("tableData").textContent).toBe("5");
  });

  it("should reset tableData correctly", () => {
    const { getByTestId } = setup();
    fireEvent.click(getByTestId("resetTableData"));
    expect(getByTestId("tableData").textContent).toBe("3");
  });
});
