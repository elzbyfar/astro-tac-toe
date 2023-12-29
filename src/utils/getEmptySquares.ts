import type { Move } from "../lib/types";
function getEmptySquares(moves: Move[], boardArea: number) {
  const allIndexes = Array.from(Array(boardArea).keys());
  const availableSquares = allIndexes.filter(
    (idx) => !moves.find((move) => move.index === idx),
  );
  return availableSquares;
}

export default getEmptySquares;
