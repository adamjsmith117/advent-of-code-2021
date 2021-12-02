import { readFile } from "../utils";

const input = readFile("../../data/day1/part1.txt");

type Reading = {
  measurement: number;
};

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

console.log(numIncreases);
