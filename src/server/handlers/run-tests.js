import { unlinkSync, writeFileSync } from "fs";

import { createVitest } from "vitest/node";
import { resolve } from "path";

const codeSnippet = `
  function add(a, b) {
    return a + b;
  }
`;

const testCode = `
  describe('add function', () => {
    it('should add two numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-1, 5)).toBe(4);
      expect(add(0, 0)).toBe(0);
    });
  });
`;

async function runTestOnSnippet(codeSnippet, testCode) {
  // Create a temporary test file
  const tempTestFile = resolve(process.cwd(), "temp.test.js");

  // Combine the code snippet and test code
  const testContent = `
    // Code to test
    ${codeSnippet}
    
    // Tests
    ${testCode}
  `;

  try {
    // Write the combined code to a temporary file
    writeFileSync(tempTestFile, testContent, "utf-8");

    const vitest = await createVitest("test", {
      include: [tempTestFile],
      watch: false,
      config: false,
      globals: true,
      environment: "node",
      silent: true,
    });

    try {
      const result = await vitest.start();
      return {
        success: !result.hasFailed,
        result: result,
      };
    } finally {
      await vitest.close();
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  } finally {
    try {
      // Clean up: delete the temporary file
      unlinkSync(tempTestFile);
    } catch {}
  }
}

// Example usage:

// Run the test
runTestOnSnippet(codeSnippet, testCode).then(({ success, error }) => {
  if (error) {
    console.error("Test failed with error:", error);
    process.exit(1);
  }
  console.log("Test completed:", success ? "PASSED" : "FAILED");
  process.exit(success ? 0 : 1);
});
