import { runTest as runTestPart1, run as runPart1 } from './part1'
import { runTest as runTestPart2, run as runPart2 } from './part2'

test('part1 test', () => {
  expect(runTestPart1(18)).toBe(26)
  expect(runTestPart1(80)).toBe(5934)
  expect(runPart1(80)).toBe(371379)
})

test('part2 test', () => {
  expect(runTestPart2(256)).toBe(26984457539)
  expect(runPart2(256)).toBe(1674303997472)
})
