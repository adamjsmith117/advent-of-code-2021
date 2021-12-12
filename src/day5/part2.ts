import { writeFileSync } from 'fs'
import { readFile, reportAnswer } from '../utils'

type Coord = { x: number; y: number }

type Line = {
  start: Coord
  end: Coord
}

type Diagram = number[][]

type LineCollection = {
  lines: Line[]
  diagram: Diagram
}

const numOverlappingCoords = (lc: LineCollection) => {
  let numOverlappingCoords = 0
  lc.diagram.forEach((line: number[]) =>
    line.forEach((val: number) => {
      if (val > 1) {
        numOverlappingCoords++
      }
    })
  )
  return numOverlappingCoords
}

const isHorizontal = (line: Line): boolean => line.start.y === line.end.y

const isVertical = (line: Line): boolean => line.start.x === line.end.x

const getLineLength = (line: Line): number => {
  if (isHorizontal(line)) {
    return Math.abs(line.end.x - line.start.x) + 1
  }
  if (isVertical(line)) {
    return Math.abs(line.end.y - line.start.y) + 1
  }
  return (
    (Math.abs(line.end.x - line.start.x) +
      Math.abs(line.end.y - line.start.y)) /
    2
  )
}

// TODO: Some indexing is off here, look at part2-output.txt and compare to diagram in aoc site
const drawLines = (lc: LineCollection): void => {
  lc.lines.forEach((line: Line) => {
    if (isHorizontal(line)) {
      const length = getLineLength(line)
      const startCoord = Math.min(line.start.x, line.end.x)
      for (let i = startCoord; i < startCoord + length; i++) {
        lc.diagram[i][line.start.y]++
      }
      return
    }
    if (isVertical(line)) {
      const length = getLineLength(line)
      const startCoord = Math.min(line.start.y, line.end.y)
      for (let i = startCoord; i < startCoord + length; i++) {
        lc.diagram[line.start.x][i]++
      }
      return
    }
    const length = getLineLength(line)
    if (line.start.x < line.end.x) {
      if (line.start.y < line.end.y) {
        // up to the right
        for (let offset = 0; offset < length; offset++) {
          lc.diagram[line.start.x + offset][line.start.y + offset]++
        }
      } else {
        // down to the right
        for (let offset = 0; offset < length; offset++) {
          lc.diagram[line.start.x + offset][line.start.y - offset]++
        }
      }
    } else {
      if (line.start.y < line.end.y) {
        // up to the left
        for (let offset = 0; offset < length; offset++) {
          lc.diagram[line.start.x - offset][line.start.y + offset]++
        }
      } else {
        // down to the left
        for (let offset = 0; offset < length; offset++) {
          lc.diagram[line.start.x - offset][line.start.y - offset]++
        }
      }
    }
  })
}

const transposeDiagram = (diagram: Diagram): Diagram =>
  diagram[0].map((_, colIndex) => diagram.map((row) => row[colIndex]))

const stringifyDiagram = (diagram: Diagram): string => {
  let retVal = ''
  transposeDiagram(diagram).forEach((line: number[]) => {
    line.forEach((val: number) => {
      retVal += val === 0 ? '.' : val.toString()
    })
    retVal += '\n'
  })
  return retVal
}

const initializeDiagram = (lines: Line[]): Diagram => {
  const diagram = [] as number[][]
  const y =
    Math.max(
      ...lines
        .map((line: Line) => line.start.y)
        .concat(lines.map((line: Line) => line.end.y))
    ) + 1
  const x =
    Math.max(
      ...lines
        .map((line: Line) => line.start.x)
        .concat(lines.map((line: Line) => line.end.x))
    ) + 1
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (!diagram[i]) {
        diagram[i] = [] as number[]
      }
      diagram[i][j] = 0
    }
  }
  return diagram
}

const buildCoord = (str: string) => ({
  x: Number(str.split(',')[0]),
  y: Number(str.split(',')[1]),
})

const buildLineCollection = (input: string[]): LineCollection => {
  const lines = [] as Line[]
  input.forEach((line: string) => {
    const [startStr, endStr] = line.split(' -> ')
    const start: Coord = buildCoord(startStr)
    const end: Coord = buildCoord(endStr)
    lines.push({ start, end })
  })
  const diagram = initializeDiagram(lines)
  return { lines, diagram }
}

const solve = (filepath: string): number => {
  const input = readFile(filepath)
  const lc = buildLineCollection(input)
  drawLines(lc)
  writeFileSync('./src/day5/part2-output.txt', stringifyDiagram(lc.diagram))
  return numOverlappingCoords(lc)
}

export const runTest = (): number => solve('data/day5/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day5/data.txt')
  reportAnswer(5, 2, answer)
  return answer
}
