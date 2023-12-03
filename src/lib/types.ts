export type Move = {
  player: string;
  index: number;
}

export type Result = {
  status: string;
  direction: string;
  winningSquares: number[];
}

export type Metadata = {
  difficulty: string;
  round: number;
  wins: number;
  losses: number;
  draws: number;
}

export type GameStateContextType = {
  moveStack: Move[];
  humanTurn: boolean;
  result: Result;
  metadata: Metadata;
  setMoveStack: (moveStack: Move[]) => void;
  setHumanTurn: (humanTurn: boolean) => void;
  setResult: (result: Result) => void;
  setMetadata: (metadata: Metadata) => void;
}