import React from "react";
import { render, fireEvent, getAllByText } from "@testing-library/react";
import { PaginationButtons } from "./PaginationButtons";
import { beforeEach, describe, expect, it } from "vitest";
import { PaginationHandlers, PaginationValues } from "../../types";
import { mockUsePagination } from "../../tests/mocks/paginationHook";

describe("PaginationButtons", () => {
  let values: PaginationValues;
  let handlers: PaginationHandlers;

  beforeEach(() => {
    values = mockUsePagination().values;
    handlers = mockUsePagination().handlers;
  });

  it("should render the correct number of page buttons", () => {
    const { getAllByRole } = render(<PaginationButtons values={values} handlers={handlers} />);
    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(values.pageButtons.length + 2);
  });

  it("should render a next button and call the incrementPage handler when clicked", () => {
    const { getAllByText } = render(<PaginationButtons values={values} handlers={handlers} />);
    const nextButton = getAllByText(/next/i);
    expect(nextButton.length).toBe(1);
    fireEvent.click(nextButton[0]);
    expect(handlers.incrementPage).toHaveBeenCalledTimes(1);
  });

  it("should render a previous button and call the decrementPage handler when clicked", () => {
    values.currentPage = 2;
    const { getAllByText } = render(<PaginationButtons values={values} handlers={handlers} />);
    const previousButton = getAllByText(/previous/i);
    expect(previousButton.length).toBe(1);
    fireEvent.click(previousButton[0]);
    expect(handlers.decrementPage).toHaveBeenCalledTimes(1);
  });

  it("should call the selectPage handler when a page button is clicked", () => {
    values.currentPage = 2;
    const { getAllByRole } = render(<PaginationButtons values={values} handlers={handlers} />);
    const buttons = getAllByRole("button");
    fireEvent.click(buttons[1]);
    expect(handlers.selectPage).toHaveBeenCalledWith(values.pageButtons[0]);
  });

  it("should render a span with a text content : '...'", () => {
    values.pageButtons = ["..."];
    const { getAllByRole, getAllByText } = render(<PaginationButtons values={values} handlers={handlers} />);
    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(2);
    const spans = getAllByText("...");
    expect(spans.length).toBe(1);
    expect(spans[0].tagName).toBe("SPAN");
    expect(spans[0].textContent).toBe("...");
  });

  it("should disable the previous button when on the first page", () => {
    values.currentPage = 1;
    const { getByText } = render(<PaginationButtons values={values} handlers={handlers} />);
    const previousButton = getByText(/previous/i) as HTMLButtonElement;
    expect(previousButton.disabled).toBe(true);
  });

  it("should disable the next button when on the last page", () => {
    values.currentPage = 5;
    values.totalPages = 5;
    const { getByText } = render(<PaginationButtons values={values} handlers={handlers} />);
    const nextButton = getByText(/next/i) as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });
  it("should disable button the page button", () => {
    const { getByText } = render(<PaginationButtons values={values} handlers={handlers} />);
    const button = getByText("1") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(handlers.selectPage).not.toHaveBeenCalled();
  });
});
