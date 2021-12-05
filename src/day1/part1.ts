import { readFile } from "../utils";
type Reading = {
  measurement: number;
};

const solve = (filepath: string): number => {
  const input = readFile(filepath);
  const readings = input.map(
    (num: string) => ({ measurement: Number(num) } as Reading)
  );

  const onBoundary = (list: any[], idx: number) =>
    idx === 0 || idx === list.length;
  const increased = (list: Reading[], idx: number) =>
    list[idx].measurement - list[idx - 1].measurement > 0;

  const numIncreases = readings.reduce(
    (acc: number, cur: Reading, idx: number) =>
      onBoundary(readings, idx) || !increased(readings, idx) ? acc : ++acc,
    0
  );

  return numIncreases;
};

export const runTest = (): number => solve("data/day1/test-data.txt");

export const run = (): number => {
  const answer = solve("data/day1/data.txt");
  console.log(answer);
  return answer;
};
// run();
