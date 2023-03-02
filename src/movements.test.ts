import { attemptMoveForward, rotateLeft, rotateRight, Position } from './movements';

describe('rotateLeft', () => {
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

describe('rotateRight', () => {
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

describe('attemptMoveForward', () => {
  it('When facing East, should move one unit to the right', () => {
    const startPosition: Position = {
      x: 0,
      y: 0,
      direction: 'East',
    }
    const endPosition = attemptMoveForward(startPosition);
    expect(endPosition).toEqual({
      x: 1,
      y: 0,
      direction: 'East',
    });
  })
  it('When facing West, should move one unit to the left', () => {
    const startPosition: Position = {
      x: 0,
      y: 0,
      direction: 'West',
    }
    const endPosition = attemptMoveForward(startPosition);
    expect(endPosition).toEqual({
      x: -1,
      y: 0,
      direction: 'West',
    });
  })
  it('When facing North, should move one unit up', () => {
    const startPosition: Position = {
      x: 0,
      y: 0,
      direction: 'North',
    }
    const endPosition = attemptMoveForward(startPosition);
    expect(endPosition).toEqual({
      x: 0,
      y: 1,
      direction: 'North',
    });
  })
  it('When facing South, should move one unit down', () => {
    const startPosition: Position = {
      x: 0,
      y: 0,
      direction: 'South',
    }
    const endPosition = attemptMoveForward(startPosition);
    expect(endPosition).toEqual({
      x: 0,
      y: -1,
      direction: 'South',
    });
  })
})
