import { rotateLeft, rotateRight, Position } from './movements';

describe('rotate left', () => {
  it('should rotate anticlockwise', () => {
    const startPosition: Position = {
      x: 0,
      y: 0,
      direction: 'North',
    }
    const endPosition = rotateLeft(startPosition);
    expect(endPosition).toEqual({
      x: 0,
      y: 0,
      direction: 'West',
    });
  });
})

describe('rotate right', () => {
  it('should rotate clockwise', () => {
    const startPosition: Position = {
      x: 0,
      y: 0,
      direction: 'North',
    }
    const endPosition = rotateRight(startPosition);
    expect(endPosition).toEqual({
      x: 0,
      y: 0,
      direction: 'East',
    });
  });
})

