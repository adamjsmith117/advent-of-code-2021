import { runTest as runTestPart1 } from "./part1";
import { runTest as runTestPart2 } from "./part2";

test("part1 test", () => {
  expect(runTestPart1()).toBe(7);
});

test("part2 test", () => {
  expect(runTestPart2()).toBe(5);
});
