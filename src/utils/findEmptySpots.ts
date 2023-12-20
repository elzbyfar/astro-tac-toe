import type { Move } from "../lib/types";
function findEmptySpots(moves: Move[]) {
  const allIndexes = Array.from(Array(9).keys());
  const availableSquares = allIndexes.filter(
    (idx) => !moves.find((move) => move.index === idx),
  );
  return availableSquares;
}

export default findEmptySpots;
