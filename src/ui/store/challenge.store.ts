import { create } from "zustand";
import { produce } from "immer";
import { OutputsStateProps, OutputStateProps } from "@/common/types/test";

interface ChallengeState {
  testOutput: OutputStateProps | null;
  testOutputs: OutputsStateProps | null;
  setOutput: (output: OutputStateProps) => void;
  setOutputs: (outputs: OutputsStateProps) => void;
  resetOutput: () => void;
  resetOutputs: () => void;
}

export const useChallengeStore = create<ChallengeState>()((set) => ({
  testOutput: null,
  testOutputs: null,
  setOutput: ({ isLoading, status, output }) =>
    set(
      produce<ChallengeState>((state) => {
        state.testOutput = {
          isLoading: isLoading ?? state.testOutput?.isLoading,
          status: status ?? state.testOutput?.status,
          output: output ?? state.testOutput?.output,
        };
      }),
    ),
  setOutputs: ({ isLoading, status, outputs, executionId }) =>
    set(
      produce<ChallengeState>((state) => {
        state.testOutputs = {
          isLoading: isLoading ?? state.testOutputs?.isLoading,
          status: status ?? state.testOutputs?.status,
          outputs: outputs ?? state.testOutputs?.outputs,
          executionId: executionId ?? state.testOutputs?.executionId,
        };
      }),
    ),
  resetOutput: () => set({ testOutput: null }),
  resetOutputs: () => set({ testOutputs: null }),
}));
