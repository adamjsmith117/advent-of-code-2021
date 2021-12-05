import { bin2Dec, readFile, reportAnswer } from "../utils";

type BinNum = string;
type DiagnosticReport = BinNum[];

const getOxygenGeneratorRating = (report: DiagnosticReport): BinNum => {
  const bitLength = report[0].length;
  let remainingBinNums = [...report];
  for (let i = 0; i < bitLength; i++) {
    const result = getMostCommonBitAtLocation(remainingBinNums, i);
    remainingBinNums = remainingBinNums.filter(
      (binNum: BinNum) => binNum.charAt(i) === result
    );
    if (remainingBinNums.length === 1) {
      return remainingBinNums[0];
    }
  }
  throw new Error("Could not determine oxygen generator rating");
};

const getC02ScrubberRating = (report: DiagnosticReport): BinNum => {
  const bitLength = report[0].length;
  let remainingBinNums = [...report];
  for (let i = 0; i < bitLength; i++) {
    const result = getLeastCommonBitAtLocation(remainingBinNums, i);
    remainingBinNums = remainingBinNums.filter(
      (binNum: BinNum) => binNum.charAt(i) === result
    );
    if (remainingBinNums.length === 1) {
      return remainingBinNums[0];
    }
  }
  throw new Error("Could not determine c02 scrubber rating");
};

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
  if (hash["0"] === hash["1"]) {
    return "0";
  }
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
  if (hash["0"] === hash["1"]) {
    return "1";
  }
  const mostCommonBit = Object.entries(hash).reduce(
    (max: [k: string, v: number], entry: [k: string, v: number]) =>
      !max || entry[1] > max[1] ? entry : max
  );
  return mostCommonBit[0];
};

const solve = (filepath: string): number => {
  const report = readFile(filepath);
  const o2Rating = getOxygenGeneratorRating(report);
  const c02Rating = getC02ScrubberRating(report);
  return bin2Dec(o2Rating) * bin2Dec(c02Rating);
};

export const runTest = (): number => solve("data/day3/test-data.txt");

export const run = (): number => {
  const answer = solve("data/day3/data.txt");
  reportAnswer(3, 2, answer);
  return answer;
};
