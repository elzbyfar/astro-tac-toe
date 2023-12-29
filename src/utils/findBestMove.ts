import type { Board, Move, ScoredMove } from "../lib/types";
import getEmptySquares from "./getEmptySquares";
import minimax from "./minimax";
import findGoodMove from "./findGoodMove";

async function findBestMove(
  updatedStack: Move[],
  difficulty: string,
  board: Board,
  forHuman?: boolean,
) {
  const emptySpots = getEmptySquares(updatedStack, board.area);

  let choice = -1;
  if (emptySpots.length) {
    if (forHuman || difficulty === "AI") {
      console.log("AI is thinking...");
      const result = await new Promise<ScoredMove>(
        (resolve: (value: ScoredMove) => void) => {
          setTimeout(() => {
            const bestMove = minimax(updatedStack, forHuman ? "X" : "O", board);
            resolve(bestMove);
          }, 0);
        },
      ).then((scoredMove) => scoredMove);

      choice = result.index;
    } else if (difficulty === "DUMB") {
      const random = Math.floor(Math.random() * emptySpots.length);
      choice = emptySpots[random];
    } else {
      choice = findGoodMove(updatedStack, board);
    }
  }
  return choice;
}

export default findBestMove;
