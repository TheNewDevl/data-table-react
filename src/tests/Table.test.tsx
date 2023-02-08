import { describe, it } from "vitest";
import { Table } from "../components/Table/Table";
import { fireEvent, getByRole, getByTestId, render } from "@testing-library/react";
import { columns } from "../mocks/columnsMock";
import { noMissingDataEmployees } from "../mocks/mockEmployees";
import { TableCtxProvider } from "../context/TableContext";
import { DataTableConfig } from "../types/types";

describe("Table integration", () => {
  const mockConfig: Partial<DataTableConfig> = {
    dates: {
      country: "us-US",
      format: "2-digit",
    },
    pagination: false,
    sortable: false,
    search: false,
    rowsPerPageOptions: [10, 20, 40],
  };

  const setup = (config: Partial<DataTableConfig>) => {
    return {
      ...render(
        <TableCtxProvider data={noMissingDataEmployees}>
          <Table columns={columns} config={config} />
        </TableCtxProvider>
      ),
    };
  };

  it("should display elements correctly", () => {
    mockConfig.search = false;
    const { getByText, getByTestId, getByRole } = setup(mockConfig);

    // Check if corresponding columns are displayed
    columns.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });

    // Check if the table has the correct number of rows
    const tbody = getByTestId("tbody");
    expect(tbody.children.length).toBe(noMissingDataEmployees.length);

    // As pagination is disabled, the tfoot containing the pagination should not be displayed
    expect(() => getByTestId("pagination")).toThrow();

    // As the search is disabled, the search input should not be displayed
    expect(() => getByRole("search")).toThrow();

    // Check if data is displayed correctly in each row
    [...tbody.children].forEach((row, y) => {
      [...row.children].forEach((column, x) => {
        //@ts-ignore
        expect(column).toHaveTextContent(noMissingDataEmployees[y][columns[x].data]);
      });
    });
  });

  it("should filter the data correctly", () => {
    mockConfig.search = true;
    const { getByText, getByRole, getByTestId } = setup(mockConfig);

    const searchInput = getByRole("search");
    fireEvent.change(searchInput, { target: { value: "Corri" } });

    expect(getByText("Corri")).toBeInTheDocument();
    expect(() => getByText("Nerissa")).toThrow();
    expect(getByTestId("tbody").children.length).toBe(1);
  });

  it("should sort the data correctly", () => {
    mockConfig.sortable = true;
    const { getByText, getByTestId } = setup(mockConfig);

    const firstNameHeader = getByText("First Name");
    fireEvent.click(firstNameHeader);

    const tbody = getByTestId("tbody");
    const firstRow = tbody.children[0];
    expect(firstRow.children[0]).toHaveTextContent("Alida");

    fireEvent.click(firstNameHeader);
    expect(tbody.children[0].children[0]).toHaveTextContent("Zia");
  });

  it("should paginate the data correctly", () => {
    mockConfig.pagination = true;
    const { getByText, getByTestId } = setup(mockConfig);

    const tbody = getByTestId("tbody");
    const pagination = getByTestId("pagination");

    // Check if the pagination is displayed correctly
    expect(tbody.children.length).toBe(10);
    expect(pagination).toBeInTheDocument();

    // Check if the pagination is working correctly
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);
    expect(tbody.children.length).toBe(10);
    expect(getByText("Next")).toBeDisabled();
    expect(getByText("Previous")).not.toBeDisabled();

    const previousButton = getByText("Previous");
    fireEvent.click(previousButton);
    expect(tbody.children.length).toBe(10);
    expect(getByText("Next")).not.toBeDisabled();
    expect(getByText("Previous")).toBeDisabled();
  });
});
