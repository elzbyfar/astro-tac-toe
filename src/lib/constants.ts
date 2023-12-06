import type { Move, Result, Stats } from "./types";

export const GAME_DIFFICULTIES: string[] = ["easy", "hard", "unbeatable"];

export const INITIAL_RESULT: Result = {
  status: "",
  direction: "",
  winningSquares: [],
};

export const INITIAL_STATS: Stats = {
  difficulty: GAME_DIFFICULTIES[2],
  round: 1,
  wins: 0,
  losses: 0,
  draws: 0,
};

export const WINNING_SCENARIOS = [
  {
    indexes: [0, 1, 2],
    direction: " rounded-xl h-32 w-96 bg-green-200 z-0 opacity-50",
    player: null,
  },
  {
    indexes: [3, 4, 5],
    direction: " rounded-xl h-32 w-96 bg-green-200 z-0 opacity-50",
    player: null,
  },
  {
    indexes: [6, 7, 8],
    direction: " rounded-xl h-32 w-96 bg-green-200 z-0 opacity-50",
    player: null,
  },
  { indexes: [0, 3, 6], direction: "vertical", player: null },
  { indexes: [1, 4, 7], direction: "vertical", player: null },
  { indexes: [2, 5, 8], direction: "vertical", player: null },
  { indexes: [0, 4, 8], direction: "diagonal1", player: null },
  { indexes: [2, 4, 6], direction: "diagonal2", player: null },
];
