import { readFile, reportAnswer } from '../utils'

type Direction = 'forward' | 'down' | 'up'
type Instruction = { direction: Direction; value: number }
type Coord = { position: number; depth: number; aim: number }

let coord: Coord = { position: 0, depth: 0, aim: 0 }

const processInstruction = (instruction: Instruction) => {
  switch (instruction.direction) {
    case 'forward':
      coord = {
        position: coord.position + instruction.value,
        depth: Math.max(coord.depth + instruction.value * coord.aim, 0),
        aim: coord.aim,
      }
      break
    case 'up':
      coord = {
        position: coord.position,
        depth: coord.depth,
        aim: coord.aim - instruction.value,
      }
      break
    case 'down':
      coord = {
        position: coord.position,
        depth: coord.depth,
        aim: coord.aim + instruction.value,
      }
      break
  }
}

const buildInstruction = (input: string): Instruction => {
  const [direction, value] = input.split(' ')
  if (!['forward', 'down', 'up'].includes(direction)) {
    throw new Error(`Unrecognized direction: ${direction}`)
  }
  return {
    direction,
    value: Number(value),
  } as Instruction
}

const solve = (filepath: string): number => {
  coord = { position: 0, depth: 0, aim: 0 }
  readFile(filepath).map(buildInstruction).forEach(processInstruction)
  return coord.position * coord.depth
}

export const runTest = () => solve('data/day2/test-data.txt')

export const run = () => {
  const answer = solve('data/day2/data.txt')
  reportAnswer(2, 2, answer)
  return answer
}
