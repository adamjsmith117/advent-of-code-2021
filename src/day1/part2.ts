import { readFile } from "../utils";

const input = readFile("../../data/day1/part2.txt");

type Reading = {
  measurement: number;
};

const readings = input.map(
  (num: string) => ({ measurement: Number(num) } as Reading)
);

const onBoundary = (list: any[], idx: number): boolean =>
  idx < 2 || idx === list.length - 1;

const increased = (list: Reading[], idx: number): boolean =>
  threeMeasurementWindowSum(list, idx) <
  threeMeasurementWindowSum(list, idx + 1);

const threeMeasurementWindowSum = (list: Reading[], idx: number): number =>
  list[idx].measurement + list[idx - 1].measurement + list[idx - 2].measurement;

const numIncreases = readings.reduce(
  (acc: number, cur: Reading, idx: number) =>
    onBoundary(readings, idx) || !increased(readings, idx) ? acc : ++acc,
  0
);

console.log(numIncreases);
