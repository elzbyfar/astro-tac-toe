import { findWinner } from ".";
import type { Board, Move, ScoredMove } from "../lib/types";
import getEmptySquares from "./getEmptySquares";

const MAX_DEPTH = 10;
const memo = {} as { [key: string]: ScoredMove };

function minimax(
  updatedStack: Move[],
  player: string,
  board: Board,
  depth: number = 0,
  alpha: number = -Infinity,
  beta: number = Infinity,
): ScoredMove {
  const stateKey = updatedStack.reduce((acc, move) => {
    return acc + move.player + move.index;
  }, "");

  if (memo[stateKey] !== undefined) {
    return memo[stateKey];
  }

  const emptySpots = getEmptySquares(updatedStack, board.area);

  if (findWinner("X", updatedStack, board.area)) {
    return { index: -1, score: -1 };
  } else if (findWinner("O", updatedStack, board.area)) {
    return { index: -1, score: 1 };
  } else if (emptySpots.length === 0 || depth >= MAX_DEPTH) {
    return { index: -1, score: 0 };
  }

  let bestMove: ScoredMove = { index: -1, score: 0 };
  if (player === "O") {
    let bestScore = -Infinity;
    for (let index of emptySpots) {
      updatedStack.push({ player, index });
      const { score } = minimax(
        updatedStack,
        "X",
        board,
        depth + 1,
        alpha,
        beta,
      );
      updatedStack.pop();

      if (score > bestScore) {
        bestScore = score;
        bestMove = { index, score };
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break; // Beta cutoff
        }
      }
    }
  } else {
    let bestScore = Infinity;
    for (let index of emptySpots) {
      updatedStack.push({ player, index });
      const { score } = minimax(
        updatedStack,
        "O",
        board,
        depth + 1,
        alpha,
        beta,
      );
      updatedStack.pop();

      if (score < bestScore) {
        bestScore = score;
        bestMove = { index, score };
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
          break; // Alpha cutoff
        }
      }
    }
  }

  memo[stateKey] = bestMove;
  return bestMove;
}

export default minimax;
