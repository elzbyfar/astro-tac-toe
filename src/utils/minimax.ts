import { findWinner } from ".";
import type { Board, Move, ScoredMove } from "../lib/types";
import getEmptySquares from "./getEmptySquares";

function heuristicEvaluate(updatedStack, player, board, connectN) {
  // Initialize scores
  let score = 0;

  const { area, matchToWin, possibleDiags } = board;

  const sides = Math.sqrt(area);

  const boardState = {
    rows: [],
    cols: [],
    diags: [],
  };

  let r = 0;
  let c = 0;

  while (r < sides) {
    while (c < sides) {}
  }

  console.log(boardState);

  // Implement a simple heuristic: count the number of lines where player is close to winning
  // Check rows, columns, and both diagonals

  // Check rows
  for (let i = 0; i < sides; i++) {
    let row = [];
    for (let j = 0; j < sides; j++) {
      row.push(board[i * sides + j]);
    }
    score += evaluateLine(row, player, connectN);
  }

  // Check columns
  for (let i = 0; i < sides; i++) {
    let col = [];
    for (let j = 0; j < sides; j++) {
      col.push(board[j * sides + i]);
    }
    score += evaluateLine(col, player, connectN);
  }

  // Check diagonals
  let diag1 = [];
  let diag2 = [];
  for (let i = 0; i < sides; i++) {
    diag1.push(board[i * sides + i]);
    diag2.push(board[i * sides + (sides - 1 - i)]);
  }

  score += evaluateLine(diag1, player, connectN);

  score += evaluateLine(diag2, player, connectN);

  return score;
}

function evaluateLine(line, player, connectN) {
  let score = 0;
  let opponent = player === "X" ? "O" : "X";

  // Count the number of player's pieces in the line
  let playerPieces = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === player) {
      playerPieces++;
    }
  }

  // Count the number of opponent's pieces in the line
  let opponentPieces = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === opponent) {
      opponentPieces++;
    }
  }

  // Score the line
  if (playerPieces === connectN) {
    // Player has all pieces in the line
    score += 1000;
  } else if (playerPieces === connectN - 1 && opponentPieces === 0) {
    // Player has all but one piece in the line
    score += 100;
  } else if (opponentPieces === connectN) {
    // Opponent has all pieces in the line
    score -= 1000;
  } else if (opponentPieces === connectN - 1 && playerPieces === 0) {
    // Opponent has all but one piece in the line
    score -= 100;
  }

  return score;
}

function minimax(
  updatedStack: Move[],
  player: string,
  board: Board,
  alpha: number = -Infinity,
  beta: number = Infinity,
  depth: number = 0,
  maxDepth: number = 3,
): ScoredMove {
  const emptySpots = getEmptySquares(updatedStack, board.area);

  if (findWinner("X", updatedStack, board.area)) {
    return { index: -1, score: -1 };
  } else if (findWinner("O", updatedStack, board.area)) {
    return { index: -1, score: 1 };
  } else if (emptySpots.length === 0 || depth >= maxDepth) {
    return {
      index: -1,
      score: heuristicEvaluate(updatedStack, player, board, 4),
    }; // Assuming connect 4
  }

  const bestMove: ScoredMove = { index: -1, score: 0 };
  if (player === "O") {
    let bestScore = -Infinity;
    for (let index of emptySpots) {
      updatedStack.push({ player, index });
      const { score } = minimax(
        updatedStack,
        "X",
        boardArea,
        alpha,
        beta,
        depth + 1,
        maxDepth,
      );
      updatedStack.pop();

      if (score > bestScore) {
        bestScore = score;
        bestMove.index = index;
        bestMove.score = score;
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
        boardArea,
        alpha,
        beta,
        depth + 1,
        maxDepth,
      );
      updatedStack.pop();

      if (score < bestScore) {
        bestScore = score;
        bestMove.index = index;
        bestMove.score = score;
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
          break; // Alpha cutoff
        }
      }
    }
  }

  return bestMove;
}

// const memo = {} as { [key: string]: ScoredMove };

// function minimax(
//   updatedStack: Move[],
//   player: string,
//   boardArea: number,
//   alpha: number = -Infinity,
//   beta: number = Infinity,
// ): ScoredMove {
//   const stateKey = updatedStack.reduce((acc, move) => {
//     return acc + move.player + move.index;
//   }, "");
//   if (memo[stateKey] !== undefined) {
//     return memo[stateKey];
//   }

//   const emptySpots = getEmptySquares(updatedStack, boardArea);

//   if (findWinner("X", updatedStack, boardArea)) {
//     return { index: -1, score: -1 };
//   } else if (findWinner("O", updatedStack, boardArea)) {
//     return { index: -1, score: 1 };
//   } else if (emptySpots.length === 0) {
//     return { index: -1, score: 0 };
//   }

//   let bestMove: ScoredMove = { index: -1, score: 0 };

//   if (player === "O") {
//     let bestScore = -Infinity;
//     for (const index of emptySpots) {
//       updatedStack.push({ player, index });
//       const { score } = minimax(updatedStack, "X", boardArea, alpha, beta);
//       updatedStack.pop();

//       if (score > bestScore) {
//         bestScore = score;
//         bestMove = { index, score };
//         alpha = Math.max(alpha, bestScore);
//         if (beta <= alpha) {
//           break; // beta cut-off
//         }
//       }
//     }
//   } else {
//     let bestScore = Infinity;
//     for (const index of emptySpots) {
//       updatedStack.push({ player, index });
//       const { score } = minimax(updatedStack, "O", boardArea, alpha, beta);
//       updatedStack.pop();

//       if (score < bestScore) {
//         bestScore = score;
//         bestMove = { index, score };
//         beta = Math.min(beta, bestScore);
//         if (beta <= alpha) {
//           break; // alpha cut-off
//         }
//       }
//     }
//   }

//   memo[stateKey] = bestMove;
//   return bestMove;
// }

export default minimax;
