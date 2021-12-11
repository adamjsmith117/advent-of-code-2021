import { readFile, reportAnswer } from '../utils'

type Reading = {
  measurement: number
}

const solve = (filepath: string): number => {
  const input = readFile(filepath)
  const readings = input.map(
    (num: string) => ({ measurement: Number(num) } as Reading)
  )

  const onBoundary = (list: any[], idx: number): boolean =>
    idx < 2 || idx === list.length - 1

  const increased = (list: Reading[], idx: number): boolean =>
    threeMeasurementWindowSum(list, idx) <
    threeMeasurementWindowSum(list, idx + 1)

  const threeMeasurementWindowSum = (list: Reading[], idx: number): number =>
    list[idx].measurement +
    list[idx - 1].measurement +
    list[idx - 2].measurement

  const numIncreases = readings.reduce(
    (acc: number, cur: Reading, idx: number) =>
      onBoundary(readings, idx) || !increased(readings, idx) ? acc : ++acc,
    0
  )
  return numIncreases
}

export const runTest = (): number => solve('data/day1/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day1/data.txt')
  reportAnswer(1, 2, answer)
  return answer
}
