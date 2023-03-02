import { rotateLeft, rotateRight, attemptMoveForward, Position } from "./movements";

export const convertCharacterIntoCommand = (character: string) => {
  if (character === "L") {
    console.log('here')
    console.log('typeof rotateLeft', typeof rotateLeft)
    return rotateLeft;
  }
  if (character === "R") {
    return rotateRight;
  }
  if (character === "M") {
    return attemptMoveForward;
  }
  throw new Error(`Unknown command ${character}`);
};

interface Sequence {
  position: Position;
  instructions: ((position: Position) => Position)[];
}

export const convertIntrustructionsIntoCommands = (instructions: string) => {
  return {
    gridHeight: 0,
    gridWidth: 0,
    sequences: [],
  }
}

