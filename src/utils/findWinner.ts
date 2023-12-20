import type { Move } from "../lib/types";
import { WINNING_SCENARIOS } from "../lib/constants";
let count = 0;
const findWinner = (player: string, moves: Move[], boardArea: number) => {
  const allMovesByPlayer = moves.reduce((movesList, move) => {
    if (move.player === player) movesList.push(move.index);
    return movesList;
  }, [] as number[]);

  console.log("calling this a bunch tho", count++);
  const foundWinner = WINNING_SCENARIOS[boardArea].find((scenario) =>
    scenario.every((idx) => allMovesByPlayer.includes(idx)),
  );

  return foundWinner;
};

export default findWinner;
