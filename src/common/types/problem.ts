export interface ProblemProps {
  name: string;
  statement: string;
  difficulty: string;
  description: string;
  examples: {
    input: string;
    output: string;
  }[];
  sampleInput: string;
  code: string;
  solution: string;
  testCode: (arg: string) => string;
  testCases: string;
}
