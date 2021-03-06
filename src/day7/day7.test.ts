import { runTest as runTestPart1, run as runPart1 } from './part1'
import { runTest as runTestPart2, run as runPart2 } from './part2'

test('part1 test', () => {
  expect(runTestPart1()).toEqual(37)
  expect(runPart1()).toEqual(357353)
})

test('part2 test', () => {
  expect(runTestPart2()).toEqual(168)
  expect(runPart2()).toEqual(104822130)
})
