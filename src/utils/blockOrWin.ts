import type { Move } from "../lib/types";
import findGoodMoves from "./findGoodMoves";

function blockOrWin(updatedStack: Move[], boardArea: number) {
  const aiSquares = [] as number[];
  const huSquares = [] as number[];

  updatedStack.forEach((move) => {
    if (move.player === "O") {
      aiSquares.push(move.index);
    } else {
      huSquares.push(move.index);
    }
  });

  const { mustPlay: aiMustPlay, canPlay: aiCanPlay } = findGoodMoves(
    huSquares,
    updatedStack,
    boardArea,
  );

  const { mustPlay: humanMustProtect } = findGoodMoves(
    aiSquares,
    updatedStack,
    boardArea,
  );

  if (humanMustProtect > -1) {
    return humanMustProtect;
  }
  if (aiMustPlay > -1) {
    return aiMustPlay;
  }

  const random = Math.floor(Math.random() * aiCanPlay.length);
  return aiCanPlay[random];
}

export default blockOrWin;
