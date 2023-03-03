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
    expect(gridHeight).toBe(7);
    expect(gridWidth).toBe(3);
  });
  it('should return a list of instructions for every pair of lines after the first', () => {
    const fakeInstructions = `3 7
    1 2 N
    LFLFLFLFF
    3 3 E
    FFRFFRFRRF`;
    const result = convertIntrustructionsIntoCommands(fakeInstructions);
    const { sequences } = result
    expect(sequences.length).toBe(2);
  });
  it('Each sequence should contain instructions', () => {
    const fakeInstructions = `3 7
    1 2 N
    LFLFLFLFF
    3 3 E
    FFRFFRFRRF`;
    const result = convertIntrustructionsIntoCommands(fakeInstructions);
    const { sequences } = result
    expect(sequences[0].instructions.length).toBe(9);
    expect(sequences[1].instructions.length).toBe(10);
  })
});
