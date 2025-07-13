import { ZodError } from "zod";
import { execSync } from "child_process"; // Import the execSync function

export interface GlobalResponse {
  fieldErrors?: Record<string, string[] | undefined | null>;
  error?: string;
  message?: string;
  status?: "success" | "error";
}

export function respondWithError(error: unknown): GlobalResponse {
  if (error instanceof ZodError) {
    return {
      fieldErrors: error.flatten().fieldErrors,
      status: "error",
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      status: "error",
    };
  }

  throw error;
}

export function respondWithSuccess(message: string): GlobalResponse {
  return {
    message,
    status: "success",
  };
}

try {
  const output = execSync(
    `node ${process.cwd()}/src/server/handlers/run-tests.js`,
    {
      encoding: "utf-8",
    }
  );
  console.log("Command executed successfully", output);
} catch (error) {
  console.error("Error executing command:", error);
}
