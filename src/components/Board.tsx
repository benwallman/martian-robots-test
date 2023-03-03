import { useEffect, useState } from 'react'
import { convertIntrustructionsIntoCommands, Sequence } from '../input'
import { getDirectionByName, moveIsValid, scentLeftHere } from '../movements'
import { createBoard } from '../board'

interface BoardProps {
  instructions: string
}

interface Robot extends Sequence {
  display: boolean
  lost?: boolean
}

const CellContent = (rowIndex: number, columnIndex: number, robots: Robot[]) => {
  const robotIndex = robots.findIndex(robot => robot.position.x === columnIndex && robot.position.y === rowIndex)
  const robot = robots[robotIndex]
  if (robotIndex === -1 || !robot?.display) {
    return `${rowIndex} ${columnIndex}`
  }

  return `R${robotIndex} ${robot.position.direction} ${rowIndex} ${columnIndex}`
}

const Completed = () => (
  <div>
    <h1>
      Completed
    </h1>
  </div>
)

const Board = ({ instructions }: BoardProps) => {
  const {
    gridHeight,
    gridWidth,
    sequences,
  } = convertIntrustructionsIntoCommands(instructions)
  const board = createBoard(gridWidth, gridHeight)

  const [robots, setRobots] = useState<Robot[]>(sequences.map((sequence, index) => ({
    ...sequence,
    display: Boolean(index === 0)
  })))

  const [currentRobotIndex, setCurrentRobotIndex] = useState(0)

  const currentRobot = robots[currentRobotIndex]

  const [completed, setCompleted] = useState(false)

  const tick = () => {
    if (currentRobotIndex === robots.length - 1 && currentRobot.instructions.length === 0) {
      // All robots have completed their instructions
      if (!completed) {
        const lastPositions = robots.map(({ position, lost }) => `${position.x} ${position.y} ${getDirectionByName(position.direction).reference} ${lost ? 'Lost' : ''}`).join('\n')
        window.alert(lastPositions)
      }
      setCompleted(true)
      return
    }
    if (currentRobot.instructions.length === 0) {
      setRobots(currentRobots => currentRobots.map((robot, index) => {
        if (index === currentRobotIndex) {
          return {
            ...robot,
            display: false,
          }
        }
        if (index === currentRobotIndex + 1) {
          return {
            ...robot,
            display: true,
          }
        }
        return robot
      }))
      setCurrentRobotIndex(currentRobotIndex => currentRobotIndex + 1)
      return;
    }
    const { instructions } = currentRobot
    const [nextInstruction] = instructions
    const updatedPosition = nextInstruction(currentRobot.position)
    const isValidMove = moveIsValid(updatedPosition, gridHeight, gridWidth)
    if (!isValidMove) {
      const previousInvalidPositions = robots.filter(({ lost }) => lost).map(({ position }) => position)
      const scentHere = scentLeftHere(currentRobot.position, previousInvalidPositions)
      const updatedRobot = {
        ...currentRobot,
        lost: !scentHere,
        instructions: scentHere ? instructions.slice(1) : [],
      }
      setRobots(currentRobots => currentRobots.map((robot, index) => {
        if (index === currentRobotIndex) {
          return updatedRobot
        }
        return robot
      }))
      return
    }
    const updatedRobot = {
      ...currentRobot,
      position: updatedPosition,
      instructions: instructions.slice(1),
    }
    setRobots(robots.map((robot, index) => {
      if (index === currentRobotIndex) {
        return updatedRobot
      }
      return robot
    }))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 500)
    return () => clearInterval(interval)
  })

  if (completed) {
    return (
      <Completed />
    )
  }

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
        flexDirection: 'column-reverse',
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
