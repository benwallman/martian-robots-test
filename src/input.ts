import { rotateLeft, rotateRight, attemptMoveForward } from "./movements";

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
