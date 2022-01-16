import { readFile, reportAnswer } from '../utils'

const REPRODUCTION_PERIOD = 6 // means once every 7 days, 0 is valid value
const MATURING_PERIOD = 2 // time before a baby can begin a reproduction countdown

type Fish = number
type School = Fish[]

const processDay = (school: School): School => {
  const updatedSchool: School = []
  school.forEach((fish: Fish) => {
    if (fish === 0) {
      updatedSchool.push(REPRODUCTION_PERIOD + MATURING_PERIOD)
      updatedSchool.push(REPRODUCTION_PERIOD)
    } else {
      updatedSchool.push(fish - 1)
    }
  })
  return updatedSchool
}

const buildSchool = (input: string[]): School => input[0].split(',').map(Number)

const solve = (filepath: string, days: number): number => {
  const input = readFile(filepath)
  let school = buildSchool(input)
  for (let i = 0; i < days; i++) {
    school = processDay(school)
    // console.log('After ' + i + ' days: ', school)
  }
  return school.length
}

export const runTest = (days: number): number =>
  solve('data/day6/test-data.txt', days)

export const run = (days: number): number => {
  const answer = solve('data/day6/data.txt', days)
  reportAnswer(6, 1, answer)
  return answer
}
