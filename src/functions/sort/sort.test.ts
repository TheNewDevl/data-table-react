import { dateCompareFn, numberCompareFn, stringCompareFn } from "./sort";
import { describe, expect, it } from "vitest";

describe("Sort compare functions test suite", () => {
  describe("numberCompareFn", () => {
    it('should return a negative number if a is less than b and sortOrder is "asc" or not provided', () => {
      expect(numberCompareFn(1, 2)).toBeLessThan(0);
      expect(numberCompareFn(1, 2, "asc")).toBeLessThan(0);
    });

    it('should return a positive number if a is greater than b and sortOrder is "asc" or not provided', () => {
      expect(numberCompareFn(2, 1)).toBeGreaterThan(0);
      expect(numberCompareFn(2, 1, "asc")).toBeGreaterThan(0);
    });

    it('should return 0 if a is equal to b and sortOrder is "asc" or not provided', () => {
      expect(numberCompareFn(1, 1)).toEqual(0);
      expect(numberCompareFn(1, 1, "asc")).toEqual(0);
    });

    it('should return a positive number if a is less than b and sortOrder is "desc"', () => {
      expect(numberCompareFn(1, 2, "desc")).toBeGreaterThan(0);
    });

    it('should return a negative number if a is greater than b and sortOrder is "desc"', () => {
      expect(numberCompareFn(2, 1, "desc")).toBeLessThan(0);
    });

    it('should return 0 if a is equal to b and sortOrder is "desc"', () => {
      expect(numberCompareFn(1, 1, "desc")).toEqual(0);
    });
  });

  describe("stringCompareFn", () => {
    it('should return 0 if a is equal to b and sortOrder is "asc" or not provided', () => {
      expect(stringCompareFn("à", "à")).toBe(0);
      expect(stringCompareFn("àbc", "àbc")).toBe(0);
    });
    it('should return 0 if a is equal to b and sortOrder is "desc"', () => {
      expect(stringCompareFn("à", "à", "desc")).toBe(0);
      expect(stringCompareFn("àbc", "àbc", "desc")).toBe(0);
    });

    it('should return -1 if a is less than b and sortOrder is "asc" or not provided', () => {
      expect(stringCompareFn("à", "b")).toBe(-1);
      expect(stringCompareFn("abc", "abcd")).toBe(-1);
    });
    it('should return 1 if a is less than b and sortOrder is "desc"', () => {
      expect(stringCompareFn("à", "b", "desc")).toBe(1);
      expect(stringCompareFn("abc", "abcd", "desc")).toBe(1);
    });

    it('should return -1 if a is greater than b and sortOrder is "desc"', () => {
      expect(stringCompareFn("b", "à", "desc")).toBe(-1);
      expect(stringCompareFn("abcd", "abc", "desc")).toBe(-1);
    });

    it('should return 1 if a is greater than b and sortOrder is "asc" or not provided', () => {
      expect(stringCompareFn("b", "à")).toBe(1);
      expect(stringCompareFn("abcd", "abca")).toBe(1);
    });
  });

  describe("dateCompareFn", () => {
    it('should return a negative number if a is less than b and sortOrder is "asc" or not provided', () => {
      expect(dateCompareFn("2020-01-01", "2020-01-02")).toBeLessThan(0);
      expect(dateCompareFn("2020-01-01", "2020-01-02", "asc")).toBeLessThan(0);
    });

    it('should return a positive number if a is greater than b and sortOrder is "asc" or not provided', () => {
      expect(dateCompareFn("2020-01-02", "2020-01-01")).toBeGreaterThan(0);
      expect(dateCompareFn("2020-01-02", "2020-01-01", "asc")).toBeGreaterThan(0);
    });

    it('should return 0 if a is equal to b and sortOrder is "asc" or not provided', () => {
      expect(dateCompareFn("2020-01-01", "2020-01-01")).toEqual(0);
      expect(dateCompareFn("2020-01-01", "2020-01-01", "asc")).toEqual(0);
    });

    it('should return a positive number if a is less than b and sortOrder is "desc"', () => {
      expect(dateCompareFn("2020-01-01", "2020-01-02", "desc")).toBeGreaterThan(0);
    });

    it('should return a negative number if a is greater than b and sortOrder is "desc"', () => {
      expect(dateCompareFn("2020-01-02", "2020-01-01", "desc")).toBeLessThan(0);
    });

    it('should return 0 if a is equal to b and sortOrder is "desc"', () => {
      expect(dateCompareFn("2020-01-01", "2020-01-01", "desc")).toEqual(0);
    });
  });
});
