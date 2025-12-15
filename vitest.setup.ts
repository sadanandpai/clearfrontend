// Vitest setup file to provide jest compatibility
import { vi } from "vitest";

// Make jest APIs available globally for compatibility with test cases
// that use jest.fn(), jest.useFakeTimers(), etc.
(globalThis as any).jest = {
  fn: vi.fn,
  useFakeTimers: vi.useFakeTimers,
  clearAllTimers: vi.clearAllTimers,
  advanceTimersByTime: vi.advanceTimersByTime,
  runAllTimers: vi.runAllTimers,
  now: vi.now,
};
