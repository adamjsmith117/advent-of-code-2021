import { readFile, reportAnswer } from '../utils'

const solve = (filepath: string): number => {
  const input = readFile(filepath, ',')
    .map(Number)
    .sort((a: number, b: number) => a - b)

  let best = 1_000_000_000
  for (let i = 0; i < 2000; i++) {
    // 2000?
    let score = 0
    input.forEach((x: number) => {
      const d = Math.abs(x - i)
      score += fuelCost(d)
    })
    if (score < best) {
      best = score
    }
  }
  return best
}

const fuelCost = (d: number): number => (d * (d + 1)) / 2

export const runTest = (): number => solve('data/day7/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day7/data.txt')
  reportAnswer(7, 2, answer)
  return answer
}
