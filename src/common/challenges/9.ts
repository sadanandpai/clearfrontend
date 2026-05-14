export const problem = {
  id: 9,
  name: "Rolling transcript buffer",
  statement:
    "In a real-time speech-to-text application, a circular or rolling buffer is often used to manage the active transcript displayed to the user. As new text is spoken, it's appended to the end of the current transcript. If the transcript buffer exceeds a maximum size, the oldest text is truncated (removed) from the beginning to make room for the new text, ensuring the UI always shows the most recent speech.<br /> <br />",
  description:
    "Your task is to write a function, <code>findNewPart</code>, that determines <strong>only the newly added segment</strong> of the transcript given the previous state (<code>string1</code>) and the current state (<code>string2</code>) of the buffer.<br/><br/><strong>Assumptions:</strong><br/>You can assume that any change in the middle of the string is non-existent; changes only occur at the beginning (truncation) and the end (addition).",
  difficulty: "medium",
  languages: ["javascript", "typescript"],
  examples: [
    {
      input: `["Hello, how are you", "Hello, how are you doing today?"]`,
      output: `" doing today?"`,
      explanation:
        "No truncation occurred. The new part is the suffix of string2 after string1's length.",
    },
    {
      input: `["The quick brown fox", "brown fox jumps over the lazy dog"]`,
      output: `" jumps over the lazy dog"`,
      explanation:
        "The prefix 'The quick ' was truncated from string1. The common overlap is 'brown fox', and the new part is the remainder of string2.",
    },
    {
      input: `["apple banana", "banana orange"]`,
      output: `" orange"`,
      explanation:
        "The prefix 'apple ' was truncated. The common overlap is 'banana', and the new part is ' orange'.",
    },
    {
      input: `["The cat sat", "The cat sat"]`,
      output: `""`,
      explanation: "No changes were made, so the new part is an empty string.",
    },
    {
      input: `["old text is gone", "this is new text entirely"]`,
      output: `"this is new text entirely"`,
      explanation:
        "If there is no overlap, it means string1 was entirely truncated, and the entirety of string2 is the new part.",
    },
  ],
  sampleInput: `["Hello, how are you", "Hello, how are you doing today?"]`,
  code: `/**
 * Finds the new part of the transcript that has been added to string2
 * relative to string1, assuming a rolling buffer mechanism.
 *
 * @param {string} string1 The previous state of the transcript buffer.
 * @param {string} string2 The current state of the transcript buffer.
 * @returns {string} The newly added segment of the transcript.
 */
export default function findNewPart(string1, string2) {
  // write your code here
}
`,
  solution: ` /**
   * Finds the new part of string2 that has been added relative to string1.
   *
   * @param {string} string1 The original string.
   * @param {string} string2 The modified string.
   * @returns {string} The new part of the string, or string2 if no common part is found.
   */
  export default function findNewPart(string1, string2) {
    // Scenario 1: string2 has characters added to the end, no truncating has happened in the beginning.
    if (string2.startsWith(string1)) {
      // Chop and return the additional part in string2
      return string2.substring(string1.length)
    }

    // Scenario 2: string2 has been truncated at the beginning and has a new part at the end.
    let tempString1 = string1
    // Start from the beginning of string1 and loop until we reach the common part
    while (tempString1.length > 0) {
      // We found the common part. Chop and return the additional part in string2.
      if (string2.startsWith(tempString1)) {
        return string2.substring(tempString1.length)
      }
      // Chop off one character from the beginning of the temporary string for next loop iteration.
      tempString1 = tempString1.substring(1)
    }

    // Scenario 2: No common suffix and prefix between the two strings. So the second string must be entirely new.
    return string2
  }

`,
  testCases: `import userSolution from './code';
import systemSolution from './solution';

// Helper function to run tests for both user and system solutions
const testImplementation = (implementation) => {
  // Example 1: No truncation, only addition
  test('Example 1: No truncation, only addition', () => {
    const s1 = "Hello, how are you";
    const s2 = "Hello, how are you doing today?";
    expect(implementation(s1, s2)).toBe(" doing today?");
  });

  // Example 2: Truncation and addition (long overlap)
  test('Example 2: Truncation and addition (long overlap)', () => {
    const s1 = "The quick brown fox";
    const s2 = "brown fox jumps over the lazy dog";
    // Overlap: "brown fox" (10 chars)
    expect(implementation(s1, s2)).toBe(" jumps over the lazy dog");
  });

  // Example 3: Truncation and addition (short overlap)
  test('Example 3: Truncation and addition (short overlap)', () => {
    const s1 = "apple banana";
    const s2 = "banana orange";
    // Overlap: "banana" (6 chars)
    expect(implementation(s1, s2)).toBe(" orange");
  });

  // Example 4: No change
  test('Example 4: No change, result should be empty string', () => {
    const s1 = "The cat sat";
    const s2 = "The cat sat";
    expect(implementation(s1, s2)).toBe("");
  });

  // Example 5: Repeated words in the string
  test('Example 5: Repeated words in the string (For example: "Yes, okay okay")', () => {
    const s1 = "apple banana banana";
    const s2 = "banana orange banana orange";
    expect(implementation(s1, s2)).toBe(" orange banana orange");
  });

  // Example 6: Full truncation
  test('Example 6: Full truncation (no overlap)', () => {
    const s1 = "old text is gone";
    const s2 = "this is new text entirely";
    // Overlap: None. Entirely new content.
    expect(implementation(s1, s2)).toBe("this is new text entirely");
  });
  
  // Edge Case: Empty strings
  test('Edge Case: Both strings are empty', () => {
    expect(implementation("", "")).toBe("");
  });

  test('Edge Case: string1 is empty, string2 is not', () => {
    expect(implementation("", "New")).toBe("New");
  });

  // Edge Case: Single character overlap
  test('Edge Case: Single character overlap', () => {
    const s1 = "a b c d";
    const s2 = "d e f g";
    // Overlap: "d"
    expect(implementation(s1, s2)).toBe(" e f g");
  });
};

describe('findNewPart - User Solution', () => {
  testImplementation(userSolution);
});
`,
  testCode: (arg: string[]) => {
    // The input argument is expected to be a string representation of a two-element array:
    // e.g., '["string1 value", "string2 value"]'
    return `import userSolution from './code';

describe('findNewPart test with input', () => {
  test('should return the correct new part', () => {
    // Safely parse the input argument which contains [string1, string2]
    const input = JSON.parse(\`${arg}\`);
    const string1 = input[0];
    const string2 = input[1];

    // Execute the user's function
    const result = userSolution(string1, string2);

    // For a generic test case, we only assert that the result is a string.
    // The platform's framework will handle asserting against the expected output string.
    expect(typeof result).toBe('string');
  });
});`;
  },
};
