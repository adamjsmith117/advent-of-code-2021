import { readFile, reportAnswer } from '../utils'

type Line = {
  input: string[]
  output: string[]
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
  return countOneFourSevenEightInstances(lines)
}

const countOneFourSevenEightInstances = (lines: Line[]): number => {
  let count = 0
  lines.forEach((line: Line) => {
    line.output.forEach((signal: string) => {
      if (
        signal.length === numSegments[1] ||
        signal.length === numSegments[4] ||
        signal.length === numSegments[7] ||
        signal.length === numSegments[8]
      ) {
        count++
      }
    })
  })
  return count
}

export const runTest = (): number => solve('data/day8/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day8/data.txt')
  reportAnswer(8, 1, answer)
  return answer
}
