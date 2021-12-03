import { readFile } from "../utils";

type Direction = "forward" | "down" | "up";
type Instruction = { direction: Direction; value: number };
type Coord = { x: number; y: number };

let coord: Coord = { x: 0, y: 0 };

const processInstruction = (instruction: Instruction) => {
  switch (instruction.direction) {
    case "forward":
      coord = { x: coord.x + instruction.value, y: coord.y };
      break;
    case "up":
      coord = { x: coord.x, y: coord.y - instruction.value };
      break;
    case "down":
      coord = { x: coord.x, y: coord.y + instruction.value };
      break;
  }
};

const buildInstruction = (input: string): Instruction => {
  const [direction, value] = input.split(" ");
  if (!["forward", "down", "up"].includes(direction)) {
    throw new Error(`Unrecognized direction: ${direction}`);
  }
  return {
    direction,
    value: Number(value),
  } as Instruction;
};

export const runTest = () => {
  const input = readFile("data/day2/part1-test.txt");
  const instructions = input.map(buildInstruction);
  instructions.forEach((ins: Instruction) => {
    processInstruction(ins);
  });

  return coord.x * coord.y;
};

export const run = () => {
  const input = readFile("data/day2/part1.txt");
  const instructions = input.map(buildInstruction);
  instructions.forEach((ins: Instruction) => {
    processInstruction(ins);
  });

  return coord.x * coord.y;
};
