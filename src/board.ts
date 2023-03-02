
export const createBoard = (width: number, height: number) =>
  Array.from(Array(height), () => new Array(width).fill(null));

