import { readFile, reportAnswer } from '../utils'

const BOARD_DIMENSION = 5

type BoardNumber = { marked: boolean; value: number }

type Board = {
  id: number
  hasBingo: boolean
  board: BoardNumber[][]
  score?: number
}

type BingoGame = {
  boards: Board[]
  drawNumbers: number[]
}

const runGame = (bingoGame: BingoGame): number => {
  let round = -1
  let finalScore
  let allBoardsHaveWon = false
  while (!allBoardsHaveWon) {
    round++
    finalScore = runRound(bingoGame, round)
    bingoGame.boards = bingoGame.boards.filter(
      (board: Board) => !board.hasBingo
    )
    if (bingoGame.boards.length === 0) {
      allBoardsHaveWon = true
    }
  }
  return finalScore as number
}

const runRound = (bingoGame: BingoGame, round: number): number | undefined => {
  const drawnNumber = bingoGame.drawNumbers[round]
  bingoGame.boards.forEach((board: Board) => {
    markDrawnNumber(board, drawnNumber)
    if (hasBingo(board)) {
      board.hasBingo = true
      board.score = getScore(board, drawnNumber)
    }
  })
  return bingoGame.boards.find((board: Board) => board.hasBingo)?.score
}

const markDrawnNumber = (board: Board, drawnNumber: number) =>
  board.board.forEach((row: BoardNumber[]) => {
    row.forEach((num: BoardNumber) => {
      if (num.value === drawnNumber) {
        num.marked = true
      }
    })
  })

const hasBingo = (board: Board) =>
  isHorizontalWin(board) || isVerticalWin(board)

const getScore = (board: Board, mostRecentlyPulledNum: number): number => {
  let sum = 0
  board.board.forEach((row: BoardNumber[]) => {
    row.forEach((num: BoardNumber) => {
      if (!num.marked) {
        sum += num.value
      }
    })
  })
  return sum * mostRecentlyPulledNum
}

const isHorizontalWin = (board: Board): boolean => {
  let win = false
  board.board.forEach((row: BoardNumber[]) => {
    if (row.every((number: BoardNumber) => number.marked)) {
      win = true
    }
  })
  return win
}

const isVerticalWin = (board: Board): boolean => {
  let win = false
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    let column = board.board.map((row: BoardNumber[]) => row[i])
    if (column.every((number: BoardNumber) => number.marked)) {
      win = true
    }
  }
  return win
}

const buildBoard = (lines: string[], boardId: number): Board => {
  const board = [] as BoardNumber[][]
  for (let i = 0; i < BOARD_DIMENSION; i++) {
    const currentRow = lines[i].trim().replace(/  /g, ' ').split(' ')
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      if (!board[i]) board[i] = []
      board[i][j] = { value: Number(currentRow[j]), marked: false }
    }
  }
  return { id: boardId, board, hasBingo: false }
}

const buildBoards = (lines: string[]): Board[] => {
  const boards: Board[] = []
  let boardId = 0
  for (let i = 2; i < lines.length; i++) {
    const currentBoardLines: string[] = []
    for (let j = 0; j < BOARD_DIMENSION; j++) {
      currentBoardLines.push(lines[i + j])
    }
    boards.push(buildBoard(currentBoardLines, boardId))
    boardId++
    i += BOARD_DIMENSION
  }
  return boards
}

const buildBingoGame = (filepath: string): BingoGame => {
  const lines = readFile(filepath)
  return {
    drawNumbers: lines[0].split(',').map(Number),
    boards: buildBoards(lines),
  }
}

const solve = (filepath: string): number => {
  const bg = buildBingoGame(filepath)
  return runGame(bg)
}

export const runTest = (): number => solve('data/day4/test-data.txt')

export const run = (): number => {
  const answer = solve('data/day4/data.txt')
  reportAnswer(4, 2, answer)
  return answer
}
