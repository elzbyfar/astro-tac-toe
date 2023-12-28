import type { Result, Board, Stats } from "./types";
import { getWinPaths } from "../utils";

export const GAME_DIFFICULTIES: string[] = ["easy", "hard", "unbeatable"];

export const BOARDS: Board[] = [
  { area: 9, label: "3 x 3", matchToWin: 3, possibleDiags: 2 },
  { area: 25, label: "5 x 5", matchToWin: 4, possibleDiags: 8 },
  { area: 49, label: "7 x 7", matchToWin: 5, possibleDiags: 18 },
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
  25: getWinPaths(BOARDS[1]),
  49: getWinPaths(BOARDS[2]),
};
