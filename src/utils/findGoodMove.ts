import type { Board, Move } from "../lib/types";
import { WINNING_SCENARIOS } from "../lib/constants";
import getEmptySquares from "./getEmptySquares";

function findGoodMoves(updatedStack: Move[], board: Board) {
  const occupiedByAi: number[] = [];
  const occupiedByHu: number[] = [];
  const freeSquares: number[] = getEmptySquares(updatedStack, board.area);

  updatedStack.forEach((move) => {
    if (move.player === "O") {
      occupiedByAi.push(move.index);
    } else {
      occupiedByHu.push(move.index);
    }
  });

  let decision: number = -1;

  type MovesMap = {
    [key: number]: { x: number[][]; o: number[][] };
  };

  const movesMapByTarget: MovesMap = {};

  WINNING_SCENARIOS[board.area].forEach((scenario) => {
    let movesTowardAiWin = 0;
    let movesTowardHuWin = 0;
    scenario.forEach((scenarioIndex) => {
      // see if the scenario is a potential win for either player
      if (occupiedByAi.includes(scenarioIndex)) {
        movesTowardAiWin++;
      }
      if (occupiedByHu.includes(scenarioIndex)) {
        movesTowardHuWin++;
      }
    });

    // if neither player has a move in the scenario, skip it
    if (!movesTowardAiWin && !movesTowardHuWin) return;

    if (!movesMapByTarget[movesTowardAiWin]) {
      movesMapByTarget[movesTowardAiWin] = { x: [], o: [] };
    }
    if (!movesMapByTarget[movesTowardHuWin]) {
      movesMapByTarget[movesTowardHuWin] = { x: [], o: [] };
    }
    movesMapByTarget[movesTowardAiWin].o.push(scenario);
    movesMapByTarget[movesTowardHuWin].x.push(scenario);
  });

  let targetMoves = board.matchToWin - 1;

  while (targetMoves > 0) {
    if (movesMapByTarget[targetMoves]) {
      const { o: aiWinScenarios, x: huWinScenarios } =
        movesMapByTarget[targetMoves];
      decision = hasAvailability(aiWinScenarios, freeSquares);
      if (decision > -1) break;

      decision = hasAvailability(huWinScenarios, freeSquares);
      if (decision > -1) break;
    }

    targetMoves--;
  }
  return decision;
}

function hasAvailability(scenarios: number[][], freeSquares: number[]) {
  let decision: number = -1;
  while (scenarios.length) {
    const potentialScenario = scenarios.pop();
    if (potentialScenario === undefined) break;
    const availableForPlay = potentialScenario.find((wIndex) =>
      freeSquares.includes(wIndex),
    );
    if (availableForPlay !== undefined) {
      decision = availableForPlay;
      break;
    }
  }
  return decision;
}

export default findGoodMoves;
