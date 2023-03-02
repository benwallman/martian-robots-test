import { useState } from 'react'
import { convertIntrustructionsIntoCommands, Sequence } from '../input'
import { createBoard } from '../board'

interface BoardProps {
  instructions: string
}

interface Robot extends Sequence {
  finished: boolean
  crashed: boolean
  display: boolean
}

const CellContent = (rowIndex: number, columnIndex: number, robots: Robot[]) => {
  const robot = robots.find(robot => robot.position.x === columnIndex && robot.position.y === rowIndex)
  if (robot) {
    return `R${rowIndex} ${columnIndex}`
  }
  return `${rowIndex} ${columnIndex}`
}


const Board = ({ instructions }: BoardProps) => {
  const {
    gridHeight,
    gridWidth,
    sequences,
  } = convertIntrustructionsIntoCommands(instructions)
  const board = createBoard(gridWidth, gridHeight)

  const [robots, setRobots] = useState(sequences.map((sequence, index) => ({
    ...sequence,
    finished: false,
    crashed: false,
    display: Boolean(index === 0)
  })))

  const [currentRobotIndex, setCurrentRobotIndex] = useState(0)

  const currentRobot = robots[currentRobotIndex]
  

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
                {CellContent(rowIndex, cellIndex, robots)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Board
