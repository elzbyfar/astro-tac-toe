import type { Move } from "../lib/types";
import findEmptySpots from "./findEmptySpots";
import minimax from "./minimax";
import blockOrWin from "./blockOrWin";

function findBestMove(
  updatedStack: Move[],
  difficulty: string,
  boardArea: number,
  forHuman?: boolean,
) {
  const emptySpots = findEmptySpots(updatedStack);

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
