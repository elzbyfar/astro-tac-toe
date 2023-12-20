import type { Move } from "../lib/types";
import getEmptySquares from "./getEmptySquares";
import minimax from "./minimax";
import blockOrWin from "./blockOrWin";

function findBestMove(
  updatedStack: Move[],
  difficulty: string,
  boardArea: number,
  forHuman?: boolean,
) {
  const emptySpots = getEmptySquares(updatedStack, boardArea);
  console.log("how about this component?");

  let choice = -1;
  if (emptySpots.length) {
    if (forHuman || difficulty === "unbeatable") {
      const result = minimax(updatedStack, forHuman ? "X" : "O", boardArea);
      choice = result.index;
    } else if (difficulty === "easy") {
      const random = Math.floor(Math.random() * emptySpots.length);
      choice = emptySpots[random];
    } else {
      choice = blockOrWin(updatedStack, boardArea);
    }
  }
  return choice;
}

export default findBestMove;
