export type DirectionName = 'North' | 'East' | 'South' | 'West';

interface Direction {
  name: string;
  reference: string;
  order: number;
}

const directions: Direction[] = [
  {
    name: 'North',
    reference: 'N',
    order: 0,
  },
  {
    name: 'East',
    reference: 'E',
    order: 1,
  },
  {
    name: 'South',
    reference: 'S',
    order: 2,
  },
  {
    name: 'West',
    reference: 'W',
    order: 3,
  },
];

export const getDirectionByName = (direction: string) => {
  const dir = directions.find(({ name }) => name === direction);
  if (!dir) {
    throw new Error(`Unknown direction ${direction}`);
  }
  return dir;
}

export const getDirectionByReference = (reference: string) => {
  const dir = directions.find(({ reference: ref }) => ref === reference);
  if (!dir) {
    throw new Error(`Unknown direction reference ${reference}`);
  }
  return dir;
}

const getDirectionByOrder = (order: number) => {
  const dir = directions.find(({ order: o }) => o === order);
  if (!dir) {
    throw new Error(`Unknown direction order ${order}`);
  }
  return dir;
}

export const rotateRight = (position: Position) => {
  const { order } = getDirectionByName(position.direction);
  if (order === undefined) {
    throw new Error(`Unknown direction ${position.direction}`);
  }
  const newOrder = (order + 1) % 4;
  const newDirection = getDirectionByOrder(newOrder).name;
  return {
    ...position,
    direction: newDirection,
  };
};

export const rotateLeft = (position: Position) => {
  const { order } = getDirectionByName(position.direction);
  if (order === undefined) {
    throw new Error(`Unknown direction ${position.direction}`);
  }
  const newOrder = (order + 3) % 4;
  const newDirection = getDirectionByOrder(newOrder).name;
  return {
    ...position,
    direction: newDirection,
  };
};

export interface Position {
  x: number;
  y: number;
  direction: string;
}

export const attemptMoveForward = (previousPosition: Position) => {
  const { x, y, direction } = previousPosition;
  switch (direction) {
    case 'North':
      return {
        x,
        y: y + 1,
        direction,
      };
    case 'East':
      return {
        x: x + 1,
        y,
        direction,
      };
    case 'South':
      return {
        x,
        y: y - 1,
        direction,
      };
    case 'West':
      return {
        x: x - 1,
        y,
        direction,
      };
    default:
      throw new Error(`Unknown direction ${direction}`);
  }
}
