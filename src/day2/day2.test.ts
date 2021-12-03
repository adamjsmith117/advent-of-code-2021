import { run, runTest } from "./part1";

test("part1 test", () => {
  expect(runTest()).toBe(150);
});

test("part1", () => {
  console.log("day2 part1:", run());
});
