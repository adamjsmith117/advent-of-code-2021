import { readFile, reportAnswer, sum } from '../utils'

type Line = {
  input: string[]
  output: string[]
  decodedOutput?: number
}

const numSegments = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
}

const solve = (filepath: string): number => {
  const input = readFile(filepath)
  const lines: Line[] = input.map((line: string) => {
    const [inputRaw, outputRaw] = line.split('|')
    const input = inputRaw.trim().split(' ')
    const output = outputRaw.trim().split(' ')
    return { input, output }
  })
  const decodedLines = lines.map(decodeOutput)
  return sum(decodedLines.map((line: Line) => line.decodedOutput || 0))
}

// TODO: decode output strings into proper digits and save (as number) to the input line's decodedOutput
const decodeOutput = (line: Line): Line => {
  return { ...line, decodedOutput: 0 }
}

export const runTest = (): number => solve('data/day8/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day8/data.txt')
  reportAnswer(8, 2, answer)
  return answer
}
