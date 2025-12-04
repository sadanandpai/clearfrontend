export function limitFunctionTestCode(arg: string) {
  return `import userSolution from './code';
import systemSolution from './solution';

describe('inputTest', () => {
  test('should check if program runs correctly for the user input', () => {
    const sampleFn = jest.fn(() => '');
    const limitedFn = userSolution(sampleFn, ${arg});

    for (let i = 0; i < ${arg}; i++) {
      limitedFn(i, i);
    }

    expect(sampleFn).toHaveBeenCalledTimes(${arg});
  });
});`;
}
