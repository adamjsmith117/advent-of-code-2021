import { bin2Dec, readFile, reportAnswer } from "../utils";

type BinNum = string;
type DiagnosticReport = BinNum[];

const getLeastCommonBitAtLocation = (
  report: DiagnosticReport,
  location: number
) => {
  const hash = {} as Record<string, number>;
  const targetBits = report.map((byte: string) => byte.charAt(location));
  targetBits.forEach((bit: string) => {
    if (hash[bit]) {
      hash[bit] = hash[bit] + 1;
    } else {
      hash[bit] = 1;
    }
  });
  const leastCommon = Object.entries(hash).reduce(
    (min: [k: string, v: number], entry: [k: string, v: number]) =>
      !min || entry[1] < min[1] ? entry : min
  );
  return leastCommon[0];
};

const getMostCommonBitAtLocation = (
  report: DiagnosticReport,
  location: number
) => {
  const hash = {} as Record<string, number>;
  const targetBits = report.map((byte: string) => byte.charAt(location));
  targetBits.forEach((bit: string) => {
    if (hash[bit]) {
      hash[bit] = hash[bit] + 1;
    } else {
      hash[bit] = 1;
    }
  });
  const mostCommonBit = Object.entries(hash).reduce(
    (max: [k: string, v: number], entry: [k: string, v: number]) =>
      !max || entry[1] > max[1] ? entry : max
  );
  return mostCommonBit[0];
};

const getGamma = (report: DiagnosticReport): BinNum => {
  const bitLength = report[0].length;
  let gamma = "";
  for (let i = 0; i < bitLength; i++) {
    gamma += getMostCommonBitAtLocation(report, i);
  }
  return gamma;
};

const getEpsilon = (report: DiagnosticReport): BinNum => {
  const bitLength = report[0].length;
  let gamma = "";
  for (let i = 0; i < bitLength; i++) {
    gamma += getLeastCommonBitAtLocation(report, i);
  }
  return gamma;
};

const solve = (filepath: string): number => {
  const report = readFile(filepath);
  const gamma = getGamma(report);
  const epsilon = getEpsilon(report);
  return bin2Dec(gamma) * bin2Dec(epsilon);
};

export const runTest = (): number => solve("data/day3/test-data.txt");

export const run = (): number => {
  const answer = solve("data/day3/data.txt");
  reportAnswer(3, 1, answer);
  return answer;
};
