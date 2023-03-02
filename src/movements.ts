export type DirectionName = 'North' | 'East' | 'South' | 'West';

interface Direction {
  name: DirectionName;
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

const getDirectionByName = (direction: DirectionName) => {
  const dir = directions.find(({ name }) => name === direction);
  if (!dir) {
    throw new Error(`Unknown direction ${direction}`);
  }
  return dir;
}

const getDirectionByReference = (reference: string) => {
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
  direction: DirectionName;
}