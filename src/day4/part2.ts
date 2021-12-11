import { readFile, reportAnswer } from '../utils'

const BOARD_DIMENSION = 5

type BoardCollection = {
  boards: Board[]
  numberCage: number[]
}

type Coord = { x: number; y: number; value: number }

type Board = {
  id: string
  board: number[][]
  markedCoords: Coord[]
  won: boolean
}

const runGame = (collection: BoardCollection): number => {
  let round = 0
  let mostRecentWinningBoard = {} as Board
  let mostRecentlyPulledNumber
  while (!collection.boards.every((board: Board) => board.won)) {
    mostRecentlyPulledNumber = processRound(collection, round)
    collection.boards.forEach((board: Board) => {
      if (!board.won && isWinner(board)) {
        mostRecentWinningBoard = board
        board.won = true
      }
    })
    round++
  }
  return calculateScore(
    mostRecentWinningBoard,
    mostRecentlyPulledNumber as number
  )
}

const calculateScore = (
  board: Board,
  mostRecentlyPulledNumber: number
): number => {
  let sum = 0
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      if (
        !board.markedCoords.some(
          (coord: Coord) => coord.x === i && coord.y === j
        )
      ) {
        sum += board.board[i][j]
      }
    }
  }
  console.log(sum, mostRecentlyPulledNumber, sum * mostRecentlyPulledNumber)
  return sum * mostRecentlyPulledNumber
}

const processRound = (collection: BoardCollection, round: number): number => {
  const drawnNumber = collection.numberCage[round]
  collection.boards.forEach((board: Board) => {
    for (let i = 0; i < BOARD_DIMENSION; i++) {
      for (let j = 0; j < BOARD_DIMENSION; j++) {
        if (board.board[i][j] === drawnNumber) {
          board.markedCoords.push({ x: i, y: j, value: board.board[i][j] })
        }
      }
    }
  })
  return drawnNumber
}

const isWinner = (board: Board): boolean => {
  // Horizontal
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    if (
      board.markedCoords
        .map((coord: Coord) => coord.x)
        .filter((xCoord: number) => xCoord === i).length === BOARD_DIMENSION
    ) {
      return true
    }
  }
  // Vertical
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    if (
      board.markedCoords
        .map((coord: Coord) => coord.y)
        .filter((yCoord: number) => yCoord === i).length === BOARD_DIMENSION
    ) {
      return true
    }
  }
  // Diagonal
  let diagonalWin = true
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    if (
      !board.markedCoords.some((coord: Coord) => coord.x === i && coord.y == i)
    ) {
      diagonalWin = false
    }
  }
  if (diagonalWin) {
    return true
  }
  // Reverse Diagonal
  let reverseDiagonalWin = true
  for (let i = BOARD_DIMENSION; i >= 0; --i) {
    if (
      !board.markedCoords.some((coord: Coord) => coord.x === i && coord.y == i)
    ) {
      reverseDiagonalWin = false
    }
  }
  if (reverseDiagonalWin) {
    return true
  }
  return false
}

const buildBoard = (lines: string[]): Board => {
  const board = [] as number[][]
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    const currentRow = lines[i].trim().replace(/  /g, ' ').split(' ')
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      if (!board[i]) board[i] = []
      board[i][j] = Number(currentRow[j])
    }
  }
  return { id: board[0][0].toString(), board, markedCoords: [], won: false }
}

const buildBoards = (lines: string[]): Board[] => {
  const boards: Board[] = []
  for (let i = 2; i < lines.length; i++) {
    const currentBoardLines: string[] = []
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      currentBoardLines.push(lines[i + j])
    }
    boards.push(buildBoard(currentBoardLines))
    i += BOARD_DIMENSION
  }
  return boards
}

const buildBoardCollection = (filepath: string): BoardCollection => {
  const lines = readFile(filepath)
  const collection: BoardCollection = {
    numberCage: lines[0].split(',').map(Number),
    boards: buildBoards(lines),
  }
  return collection
}

const solve = (filepath: string): number =>
  runGame(buildBoardCollection(filepath))

export const runTest = (): number => solve('data/day4/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day4/data.txt')
  reportAnswer(4, 1, answer)
  return answer
}
