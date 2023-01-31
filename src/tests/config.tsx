import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

beforeEach(() => {});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});
