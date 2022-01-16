import { readFile, reportAnswer } from '../utils'

const REPRODUCTION_PERIOD = 6 // means once every 7 days, 0 is valid value
const MATURING_PERIOD = 2 // time before a baby can begin a reproduction countdown

type DayTracker = number[]

const processDay = (dayTracker: DayTracker): DayTracker => {
  const updatedDayTracker: DayTracker = []

  for (let i = 0; i < REPRODUCTION_PERIOD + MATURING_PERIOD + 1; i++) {
    updatedDayTracker[i] = 0
  }

  for (let i = 0; i < REPRODUCTION_PERIOD + MATURING_PERIOD + 1; i++) {
    if (i === 0) {
      updatedDayTracker[REPRODUCTION_PERIOD] += dayTracker[0]
      updatedDayTracker[REPRODUCTION_PERIOD + MATURING_PERIOD] += dayTracker[0]
    } else {
      updatedDayTracker[i - 1] += dayTracker[i]
    }
  }
  return updatedDayTracker
}

// A "dayTracker" is an array of numbers of length (REPRODUCTION_PERIOD + MATURING_PERIOD).
// The numbers represent the number of fish in the school that currently have to
// wait idx number of days to reproduce.
// e.g. [0, 4, 6] means 0 fish are reproducing today, 4 fish have to wait 1 day, & 6 fish have to wait 2 days
const buildDayTracker = (input: string[]): number[] => {
  const dayTracker: number[] = []
  for (let i = 0; i < REPRODUCTION_PERIOD + MATURING_PERIOD + 1; i++) {
    dayTracker[i] = 0
  }
  input[0]
    .split(',')
    .map(Number)
    .forEach((fish: number) => dayTracker[fish]++)
  return dayTracker
}

const solve = (filepath: string, days: number): number => {
  const input = readFile(filepath)
  let dayTracker = buildDayTracker(input)
  for (let i = 0; i < days; i++) {
    dayTracker = processDay(dayTracker)
    // console.log('After ' + i + ' days: ', school)
  }
  return dayTracker.reduce((sum, cur) => (sum ? sum + cur : 0))
}

export const runTest = (days: number): number =>
  solve('data/day6/test-data.txt', days)

export const run = (days: number): number => {
  const answer = solve('data/day6/data.txt', days)
  reportAnswer(6, 1, answer)
  return answer
}
