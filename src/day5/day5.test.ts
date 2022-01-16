import { readFileSync } from 'fs'
import path from 'path'
import { runTest as runTestPart1, run as runPart1 } from './part1'
import { runTest as runTestPart2, run as runPart2 } from './part2'

test('part1 test', () => {
  expect(runTestPart1()).toBe(5)
  expect(runPart1()).toBe(5145)
})

test('part2 test', () => {
  expect(runTestPart2()).toBe(12)
  const output = readFileSync(
    path.resolve(__dirname, './part2-output.txt')
  ).toString()
  const expectedOutput = readFileSync(
    path.resolve(__dirname, './expectedPart2TestOutput.txt')
  ).toString()
  expect(output).toBe(expectedOutput)
  expect(runPart2()).toBe(16518)
})
