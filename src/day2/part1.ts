import { readFile, reportAnswer } from '../utils'

type Direction = 'forward' | 'down' | 'up'
type Instruction = { direction: Direction; value: number }
type Coord = { position: number; depth: number }

let coord: Coord = { position: 0, depth: 0 }

const processInstruction = (instruction: Instruction) => {
  switch (instruction.direction) {
    case 'forward':
      coord = {
        position: coord.position + instruction.value,
        depth: coord.depth,
      }
      break
    case 'up':
      coord = {
        position: coord.position,
        depth: Math.max(coord.depth - instruction.value, 0),
      }
      break
    case 'down':
      coord = {
        position: coord.position,
        depth: coord.depth + instruction.value,
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
  coord = { position: 0, depth: 0 }
  readFile(filepath).map(buildInstruction).forEach(processInstruction)
  return coord.position * coord.depth
}

export const runTest = (): number => solve('data/day2/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day2/data.txt')
  reportAnswer(2, 1, answer)
  return answer
}
