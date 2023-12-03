import type { Move, Result, Metadata } from "./types";

export const GAME_DIFFICULTIES = ["easy", "hard", "unbeatable"];

export const INITIAL_RESULT = {
  status: "",
  direction: "",
  winningSquares: []
};

export const INITIAL_METADATA = {
  difficulty: "",
  round: 1,
  wins: 0,
  losses: 0,
  draws: 0
};

export const INITIAL_GAME_STATE = {
  moveStack: [],
  humanTurn: true,
  result: INITIAL_RESULT,
  metadata: INITIAL_METADATA, 
  setMoveStack: (moveStack: Move[]) => {},
  setHumanTurn: (humanTurn: boolean) => {},
  setResult: (result: Result) => {},
  setMetadata: (metadata: Metadata) => {}
};
