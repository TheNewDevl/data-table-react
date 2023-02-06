import { isValidDate } from "./dates";
import { describe, expect, it } from "vitest";

describe("isValidDate suite test", () => {
  it("should return true for a valid date in this format MM-DD-YYYY", () => {
    expect(isValidDate("01-01-2023")).toBe(true);
  });

  it("should return true for a valid date in this format MM/DD/YYYY", () => {
    expect(isValidDate("01/01/2023")).toBe(true);
  });

  it("should return false for an invalid date", () => {
    expect(isValidDate("01-32-2023")).toBe(false);
    expect(isValidDate("13-01-2023")).toBe(false);
    expect(isValidDate("invalid date")).toBe(false);
  });

  it("should return false for a non string", () => {
    expect(isValidDate({ date: "01-01-2023" })).toBe(false);
  });
  it("should return true for a date instance", () => {
    const date = new Date();
    expect(isValidDate(date)).toBe(true);
  });
});
