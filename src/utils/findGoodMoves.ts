import type { Move } from "../lib/types";
import { WINNING_SCENARIOS } from "../lib/constants";
import getEmptySquares from "./getEmptySquares";

function findGoodMoves(
  occupiedByPlayer: number[],
  updatedStack: Move[],
  boardArea: number,
) {
  const emptySpots = getEmptySquares(updatedStack, boardArea);

  let mostGoodMoves = 0;
  const movesTowardWin = WINNING_SCENARIOS[boardArea].map((winningIndexes) => {
    const isPlayable = winningIndexes.some((wIndex) =>
      emptySpots.includes(wIndex),
    );
    if (!isPlayable) return 0;
    let movesTowardWin = 0;

    winningIndexes.forEach((index) => {
      if (occupiedByPlayer.includes(index)) {
        movesTowardWin++;
      }
    });

    if (movesTowardWin > mostGoodMoves) {
      mostGoodMoves = movesTowardWin;
    }
    return movesTowardWin;
  });

  const decisions = {
    mustPlay: -1,
    canPlay: [],
  } as { mustPlay: number | undefined; canPlay: number[] };

  if (mostGoodMoves === 2) {
    const goodMove = movesTowardWin.indexOf(2);
    const winningIndexes = WINNING_SCENARIOS[boardArea][goodMove];
    decisions.mustPlay = winningIndexes.find((wIndex) =>
      emptySpots.includes(wIndex),
    );
  } else if (mostGoodMoves === 1) {
    const goodScenarios = movesTowardWin.reduce((acc, curr, index) => {
      if (curr === 1) acc.push(index);
      return acc;
    }, [] as number[]);
    decisions.canPlay = goodScenarios
      .map((gIndex) =>
        WINNING_SCENARIOS[boardArea][gIndex].filter((idx: number) =>
          emptySpots.includes(idx),
        ),
      )
      .flat() as number[];
  }
  return decisions as { mustPlay: number; canPlay: number[] };
}

export default findGoodMoves;
