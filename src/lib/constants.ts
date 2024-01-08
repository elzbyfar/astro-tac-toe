import type { Result, Board, Stats } from "./types";
import { getWinPaths } from "../utils";

export const GAME_DIFFICULTIES: string[] = ["DUMB", "SMART", "UNBEATABLE"];

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

export const MOCK_CHAT = [
  // {
  //   id: 1,
  //   author: "ghost",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content:
  //     "Things that chat gpt things of after a victory can be funny or mean or both, but not nice",
  // },
  // {
  //   id: 2,
  //   author: "human",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content:
  //     "What's your problem? I don't have a problem, you have a problem. Things that chat gpt things of after a victory can be funny or mean or both, but not nice. Things that chat gpt things of after a victory can be funny",
  // },
  // {
  //   id: 3,
  //   author: "ghost",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content:
  //     "I don't have a problem, you have a problem. Things that chat gpt things of after a victory can be funny or mean or both, but not nice. Things that chat gpt things of after a victory can be funny or mean or both, but not nice",
  // },
  // {
  //   id: 4,
  //   author: "human",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content: "I don't have a problem, you have a problem",
  // },
  // {
  //   id: 5,
  //   author: "ghost",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content: "I don't have a problem, you have a problem",
  // },
  // {
  //   id: 6,
  //   author: "ghost",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content: "I don't have a problem, you have a problem",
  // },
  // {
  //   id: 7,
  //   author: "ghost",
  //   timestamp: new Date().toLocaleTimeString(),
  //   content: "I don't have a problem, you have a problem",
  // },
];
