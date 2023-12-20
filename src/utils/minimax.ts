import { findWinner } from ".";
import type { Move } from "../lib/types";
import findEmptySpots from "./findEmptySpots";

function minimax(updatedStack: Move[], player: string, boardArea: number) {
  const emptySpots = findEmptySpots(updatedStack);

  if (findWinner("X", updatedStack, boardArea)) {
    return { index: -1, score: -10 };
  } else if (findWinner("O", updatedStack, boardArea)) {
    return { index: -1, score: 10 };
  } else if (emptySpots.length === 0) {
    return { index: -1, score: 0 };
  }

  const moves = [] as { index: number; score: number }[];
  emptySpots.forEach((index) => {
    const move = { index, score: 0 };
    updatedStack.push({ player, index });

    if (player === "O") {
      const result = minimax(updatedStack, "X", boardArea);
      move.score = result.score;
    } else {
      const result = minimax(updatedStack, "O", boardArea);
      move.score = result.score;
    }

    updatedStack.pop();
    moves.push(move);
  });

  let bestMove = -1;
  if (player === "O") {
    let bestScore = -Infinity;
    moves.forEach((move, index) => {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = index;
      }
    });
  } else {
    let bestScore = Infinity;
    moves.forEach((move, index) => {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = index;
      }
    });
  }
  return moves[bestMove];
}

export default minimax;
