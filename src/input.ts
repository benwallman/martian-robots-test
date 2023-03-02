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

const splitMultilineToLines = (input: string) =>
  input.split(/\r?\n/).filter((element) => element);

export const convertIntrustructionsIntoCommands = (instructions: string) => {
  const [firstLine, ...restOfLines] = splitMultilineToLines(instructions);
  const firstLineAsNumbers = firstLine.split(" ").map(Number);
  const [gridHeight, gridWidth] = firstLineAsNumbers;

  return {
    gridHeight,
    gridWidth,
    sequences: [],
  }
}

