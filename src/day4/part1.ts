import { readFile, reportAnswer } from "../utils";

type BoardCollection = {
  boards: Board[];
  numbers: number[];
};

type Board = {
  board: number[][]; // 5x5 set of numbers,
  markedIndices: { x: number; y: number }[];
};

// const buildBoard = (boardData: string[]): Board => {};

const buildBoardCollection = (filepath: string): BoardCollection => {
  const lines = readFile(filepath);
  const collection: BoardCollection = {
    numbers: lines[0].split(",").map(Number),
    boards: [], // TODO
  };
  return collection;
};

const solve = (filepath: string): number => {
  const collection = buildBoardCollection(filepath);
  return 0;
};

export const runTest = (): number => solve("data/day4/test-data.txt");

export const run = (): number => {
  const answer = solve("data/day4/data.txt");
  reportAnswer(4, 1, answer);
  return answer;
};
