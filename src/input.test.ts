import { convertCharacterIntoCommand, convertIntrustructionsIntoCommands } from './input';

describe('convertCharacterIntoCommand', () => {
  it('should return a function', () => {
    expect(typeof convertCharacterIntoCommand('L')).toBe('function');
  });
  it('should error if the character is not recognised', () => {
    expect(() => convertCharacterIntoCommand('X')).toThrow();
  });
});

describe('convertIntrustructionsIntoCommands', () => {
  it('should return the grid height and width, from the characters of the first line', () => {
    const fakeInstructions = `3 7`
    const { gridHeight, gridWidth } = convertIntrustructionsIntoCommands(fakeInstructions);
    expect(gridHeight).toBe(3);
    expect(gridWidth).toBe(7);
  });
});