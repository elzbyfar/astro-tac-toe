import type { Result, Board, Stats } from "./types";
import { getWinPaths } from "../utils";

export const GAME_DIFFICULTIES: string[] = ["easy", "hard", "unbeatable"];

export const BOARDS: Board[] = [
  { area: 9, label: "3 x 3", matchToWin: 3 },
  { area: 25, label: "5 x 5", matchToWin: 4 },
  { area: 49, label: "7 x 7", matchToWin: 4 },
];

export const INITIAL_RESULT: Result = {
  status: "",
  winningSquares: [],
};

export const INITIAL_STATS: Stats = {
  difficulty: GAME_DIFFICULTIES[2],
  round: 1,
  wins: 0,
  losses: 0,
  draws: 0,
};

export const WINNING_SCENARIOS: { [key: number]: number[][] } = {
  9: getWinPaths(BOARDS[0]),
  // 25: getWinPaths(BOARDS[1]),
  // 49: getWinPaths(BOARDS[2]),
  // 9: [
  //   { indexes: [0, 1, 2], player: null },
  //   { indexes: [3, 4, 5], player: null },
  //   { indexes: [6, 7, 8], player: null },
  //   { indexes: [0, 3, 6], player: null },
  //   { indexes: [1, 4, 7], player: null },
  //   { indexes: [2, 5, 8], player: null },
  //   { indexes: [0, 4, 8], player: null },
  //   { indexes: [2, 4, 6], player: null },
  // ],
  // 25: [
  //   // connect 4 in a row, column or diagonally
  //   { indexes: [0, 1, 2, 3], player: null },
  //   { indexes: [1, 2, 3, 4], player: null },
  //   { indexes: [5, 6, 7, 8], player: null },
  //   { indexes: [6, 7, 8, 9], player: null },
  //   { indexes: [10, 11, 12, 13], player: null },
  //   { indexes: [11, 12, 13, 14], player: null },
  //   { indexes: [15, 16, 17, 18], player: null },
  //   { indexes: [16, 17, 18, 19], player: null },
  //   { indexes: [20, 21, 22, 23], player: null },
  //   { indexes: [21, 22, 23, 24], player: null },
  //   { indexes: [0, 5, 10, 15], player: null },
  //   { indexes: [5, 10, 15, 20], player: null },
  //   { indexes: [1, 6, 11, 16], player: null },
  //   { indexes: [6, 11, 16, 21], player: null },
  //   { indexes: [2, 7, 12, 17], player: null },
  //   { indexes: [7, 12, 17, 22], player: null },
  //   { indexes: [3, 8, 13, 18], player: null },
  //   { indexes: [8, 13, 18, 23], player: null },
  //   { indexes: [4, 9, 14, 19], player: null },
  //   { indexes: [9, 14, 19, 24], player: null },
  //   { indexes: [0, 6, 12, 18], player: null },
  //   { indexes: [6, 12, 18, 24], player: null },
  //   { indexes: [4, 8, 12, 16], player: null },
  //   { indexes: [8, 12, 16, 20], player: null },
  //   { indexes: [3, 7, 11, 15], player: null },
  //   { indexes: [] },
  // ],
  // 49: [
  //   { indexes: [0, 1, 2, 3, 4, 5, 6], player: null },
  //   { indexes: [7, 8, 9, 10, 11, 12, 13], player: null },
  //   { indexes: [14, 15, 16, 17, 18, 19, 20], player: null },
  //   { indexes: [21, 22, 23, 24, 25, 26, 27], player: null },
  //   { indexes: [28, 29, 30, 31, 32, 33, 34], player: null },
  //   { indexes: [35, 36, 37, 38, 39, 40, 41], player: null },
  //   { indexes: [42, 43, 44, 45, 46, 47, 48], player: null },
  //   { indexes: [0, 7, 14, 21, 28, 35, 42], player: null },
  //   { indexes: [1, 8, 15, 22, 29, 36, 43], player: null },
  //   { indexes: [2, 9, 16, 23, 30, 37, 44], player: null },
  //   { indexes: [3, 10, 17, 24, 31, 38, 45], player: null },
  //   { indexes: [4, 11, 18, 25, 32, 39, 46], player: null },
  //   { indexes: [5, 12, 19, 26, 33, 40, 47], player: null },
  //   { indexes: [6, 13, 20, 27, 34, 41, 48], player: null },
  //   { indexes: [0, 8, 16, 24, 32, 40, 48], player: null },
  //   { indexes: [6, 12, 18, 24, 30, 36, 42], player: null },
  // ],
};
