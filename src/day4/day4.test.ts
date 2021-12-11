import { runTest as runTestPart1, run as runPart1 } from './part1'
import { runTest as runTestPart2, run as runPart2 } from './part2'

test('part1 test', () => {
  expect(runTestPart1()).toBe(4512)
  expect(runPart1()).toBe(51776)
})

test('part2 test', () => {
  expect(runTestPart2()).toBe(1924)
  expect(runPart2()).toBe(16830)
})
