import { readFile, reportAnswer } from '../utils'

const solve = (filepath: string): number => {
  const input = readFile(filepath)
  return 0
}

export const runTest = (): number => solve('data/day7/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day7/data.txt')
  reportAnswer(7, 1, answer)
  return answer
}
