import type { Move, Result, Stats } from "./types";
import { WINNING_SCENARIOS } from "./constants";

export function checkWinner(player: string, moves: Move[]) {
  const allMovesByPlayer = moves.reduce((movesList, move) => {
    if (move.player === player) movesList.push(move.index);
    return movesList;
  }, [] as number[]);

  const foundWinner = WINNING_SCENARIOS.find((scenario) =>
    scenario.indexes.every((idx) => allMovesByPlayer.includes(idx)),
  );

  return foundWinner;
}

export const checkTie = (moves: Move[]) => findEmptySpots(moves).length === 0;

export function findEmptySpots(moves: Move[]) {
  const allIndexes = Array.from(Array(9).keys());
  const availableSquares = allIndexes.filter(
    (idx) => !moves.find((move) => move.index === idx),
  );
  return availableSquares;
}
