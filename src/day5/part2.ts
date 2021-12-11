import { readFile, reportAnswer } from '../utils'

const solve = (filepath: string): number => {
  const input = readFile(filepath)
  return 0
}

export const runTest = (): number => solve('data/day5/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day5/data.txt')
  reportAnswer(5, 2, answer)
  return answer
}
