export function randomNumberTestCode(arg: string) {
  return `import userSolution from './code';

describe('inputTest', () => {
  test('should check if program runs correctly for the user input', () => {
    const output = userSolution(${arg})
    expect(output).toBeGreaterThanOrEqual(${arg.split(",")[0]});
    expect(output).toBeLessThanOrEqual(${arg.split(",")[1]});
  });
});`;
}
