export type Board = {
  area: number;
  label: string;
  connectToWin: number;
};

export type Move = {
  player: string;
  index: number;
};

export type Result = {
  status: string;
  winningSquares: number[];
};

export type Stats = {
  difficulty: string;
  round: number;
  wins: number;
  losses: number;
  draws: number;
};

export type SettingsMenuOption = {
  label: string;
  value: number;
  disabled: boolean;
};

export type StatDisplayProps = {
  label: string;
  value: number | string;
  valueStyle?: string;
};

export type StyleObject = {
  [key: string]: string;
};

export type ScoredMove = {
  index: number;
  score: number;
};

export type HumanPaths = {
  [key: number]: number[][];
};

export type ReactMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
