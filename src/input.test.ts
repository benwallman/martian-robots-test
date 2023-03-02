import { convertCharacterIntoCommand } from './input';

describe('convertCharacterIntoCommand', () => {
  it('should return a function', () => {
    expect(typeof convertCharacterIntoCommand('L')).toBe('function');
  });
  it('should error if the character is not recognised', () => {
    expect(() => convertCharacterIntoCommand('X')).toThrow();
  });
});


