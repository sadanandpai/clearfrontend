export function defaultTestCode(arg: string) {
  return `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should check if program runs correctly for the user input', () => {
    expect(userSolution(${arg})).toEqual(systemSolution(${arg}));
  });
});`;
}
