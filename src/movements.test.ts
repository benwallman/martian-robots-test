import { attemptMoveForward, rotateLeft, rotateRight, moveIsValid, Position, scentLeftHere } from './movements';

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

describe('moveIsValid', () => {
  it('should return true if the move is within the board', () => {
    const position: Position = {
      x: 2,
      y: 2,
      direction: 'North',
    }
    const boardHeight = 3;
    const boardWidth = 4;
    const isValid = moveIsValid(position, boardHeight, boardWidth);
    expect(isValid).toEqual(true);
  });
  it('should return false if the move is outside the board', () => {
    const position: Position = {
      x: 2,
      y: 2,
      direction: 'North',
    }
    const boardHeight = 1;
    const boardWidth = 4;
    const isValid = moveIsValid(position, boardHeight, boardWidth);
    expect(isValid).toEqual(false);
  })
  it('should not allow you to move beyond the end of the board', () => {
    const position: Position = {
      x: 1,
      y: 2,
      direction: 'East',
    }
    const boardHeight = 10;
    const boardWidth = 1;
    const isValid = moveIsValid(position, boardHeight, boardWidth);
    expect(isValid).toEqual(false);
  })
})

describe('scentLeftHere', () => {
  it('should return true if the position has already been visited', () => {
    const position: Position = {
      x: 1,
      y: 2,
      direction: 'East',
    }
    const previousPositions: Position[] = [
      {
        x: 1,
        y: 2,
        direction: 'East',
      }
    ]
    const scentLeft = scentLeftHere(position, previousPositions);
    expect(scentLeft).toEqual(true);
  })
  it('should return false if the position has not been visited', () => {
    const position: Position = {
      x: 1,
      y: 2,
      direction: 'East',
    }
    const previousPositions: Position[] = [
      {
        x: 1,
        y: 1,
        direction: 'East',
      }
    ]
    const scentLeft = scentLeftHere(position, previousPositions);
    expect(scentLeft).toEqual(false);
  })
})
