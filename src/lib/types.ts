export type Move = {
  player: string;
  index: number;
};

export type Result = {
  status: string;
  direction: string;
  winningSquares: number[];
};

export type Stats = {
  difficulty: string;
  round: number;
  wins: number;
  losses: number;
  draws: number;
};

export type StyleObject = {
  [key: string]: string;
};

export type StatDisplayProps = {
  label: string;
  value: number | string;
  valueStyle?: string;
};
