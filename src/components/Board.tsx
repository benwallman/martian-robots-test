import { convertIntrustructionsIntoCommands } from '../input'
import { createBoard } from '../board'

interface BoardProps {
  instructions: string
}

const Board = ({ instructions }: BoardProps) => {
  const {
    gridHeight,
    gridWidth,
    sequences,
  } = convertIntrustructionsIntoCommands(instructions)
  const board = createBoard(gridWidth, gridHeight)
  return (
    <main
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <h1
        style={{
          flex: '0 0 100%',
        }}
      >
        Board
      </h1>
      <br />
      <br />
      <div style={{
        display: 'flex',
        flex: '0 0 100%',
        flexDirection: 'column',
      }}>
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: 'flex',
              flex: '0 1 100%',
              flexWrap: 'wrap',
              flexDirection: 'row',
            }}
          >
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  display: 'flex',
                  flex: '0 1 36px',
                  outline: '1px solid red',
                  height: '36px',
                  width: '36px',
                  padding: '12px',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {`${rowIndex} ${cellIndex}`}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Board
