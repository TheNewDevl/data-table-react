import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});
