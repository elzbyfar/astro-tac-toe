import type { Result, Board, Stats } from "./types";
import { getWinPaths } from "../utils";

export const GAME_DIFFICULTIES: string[] = ["DUMB", "SMART", "AI"];

export const BOARDS: Board[] = [
  { area: 9, label: "3 x 3", connectToWin: 3 },
  { area: 25, label: "5 x 5", connectToWin: 4 },
  { area: 49, label: "7 x 7", connectToWin: 5 },
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

const ALL_PATHS: {
  [key: number]: {
    winPaths: number[][];
    pathsByIndex: { [key: number]: number[][] };
  };
} = {
  9: getWinPaths(BOARDS[0]),
  25: getWinPaths(BOARDS[1]),
  49: getWinPaths(BOARDS[2]),
};
export const WINNING_SCENARIOS: { [key: number]: number[][] } = {
  9: ALL_PATHS[9].winPaths,
  25: ALL_PATHS[25].winPaths,
  49: ALL_PATHS[49].winPaths,
};

export const PATHS_BY_INDEX: { [key: number]: { [key: number]: number[][] } } =
  {
    9: ALL_PATHS[9].pathsByIndex,
    25: ALL_PATHS[25].pathsByIndex,
    49: ALL_PATHS[49].pathsByIndex,
  };
