// Vitest setup file to provide jest compatibility
import { vi } from "vitest";

interface JestGlobalShim {
  fn: typeof vi.fn;
  useFakeTimers: typeof vi.useFakeTimers;
  clearAllTimers: typeof vi.clearAllTimers;
  advanceTimersByTime: typeof vi.advanceTimersByTime;
  runAllTimers: typeof vi.runAllTimers;
  now: () => number;
}

// Make jest APIs available globally for compatibility with test cases
// that use jest.fn(), jest.useFakeTimers(), etc.
(globalThis as typeof globalThis & { jest: JestGlobalShim }).jest = {
  fn: vi.fn,
  useFakeTimers: vi.useFakeTimers,
  clearAllTimers: vi.clearAllTimers,
  advanceTimersByTime: vi.advanceTimersByTime,
  runAllTimers: vi.runAllTimers,
  now: () => Date.now(),
};
