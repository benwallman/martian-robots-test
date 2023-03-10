import { rotateLeft, rotateRight, attemptMoveForward, Position, getDirectionByReference } from "./movements";

export const convertCharacterIntoCommand = (character: string) => {
  if (character === "L") {
    return rotateLeft;
  }
  if (character === "R") {
    return rotateRight;
  }
  if (character === "F") {
    return attemptMoveForward;
  }
  throw new Error(`Unknown command ${character}`);
};

export interface Sequence {
  position: Position;
  instructions: ((position: Position) => Position)[];
}

const splitMultilineToLines = (input: string) =>
  input.split(/\r?\n/).filter((element) => element);

const convertRestOfLinesIntoSequences = (restOfLines: string[]) => restOfLines.reduce((acc, line, index) => {
  if (index % 2 === 0) {
    const [x, y, directionReference] = line.trim().split(" ")
    const direction = getDirectionByReference(directionReference).name
    
    const position: Position = {
      x: Number(x),
      y: Number(y),
      direction,
    };
    acc.push({
      position,
      instructions: [],
    });
  } else {
    const lastSequence = acc[acc.length - 1];
    const instructions = line.trim().split("").map(convertCharacterIntoCommand);
    lastSequence.instructions = instructions;
  }
  return acc;
}, [] as Sequence[]);

export const convertIntrustructionsIntoCommands = (instructions: string) => {
  const [firstLine, ...restOfLines] = splitMultilineToLines(instructions);
  const firstLineAsNumbers = firstLine.split(" ").map(Number).map(val => val + 1)
  const [gridWidth, gridHeight] = firstLineAsNumbers;
  const sequences = convertRestOfLinesIntoSequences(restOfLines);
  return {
    gridHeight,
    gridWidth,
    sequences,
  }
}
