import { createBoard } from './board'

describe('createBoard', () => {
  it('should create a board with the correct dimensions', () => {
    const board = createBoard(3, 5)
    expect(Array.isArray(board)).toBe(true)
    expect(board.length).toBe(5)
    expect(board[0].length).toBe(3)
  })
  it('Board should be full of null', () => {
    const board = createBoard(2, 2)
    expect(board[0][0]).toBe(null)
    expect(board[1][1]).toBe(null)
  })
})

