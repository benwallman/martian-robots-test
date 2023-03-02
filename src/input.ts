import { rotateLeft, rotateRight, attemptMoveForward, Position, getDirectionByReference } from "./movements";

export const convertCharacterIntoCommand = (character: string) => {
  if (character === "L") {
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
  const firstLineAsNumbers = firstLine.split(" ").map(Number);
  const [gridHeight, gridWidth] = firstLineAsNumbers;
  const sequences = convertRestOfLinesIntoSequences(restOfLines);
  return {
    gridHeight,
    gridWidth,
    sequences,
  }
}
