import type { Board, Move } from "../lib/types";
import { WINNING_SCENARIOS } from "../lib/constants";
import getEmptySquares from "./getEmptySquares";

function findGoodMove(updatedStack: Move[], board: Board) {
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
    [key: number]: number[][];
  };

  const movesMapByTarget: MovesMap = {};
  const bestCases: { [key: number]: number[][] } = {};

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

    if (
      (movesTowardAiWin && !movesTowardHuWin) ||
      (!movesTowardAiWin && movesTowardHuWin)
    ) {
      const curr = movesTowardAiWin || movesTowardHuWin;
      bestCases[curr] = [...(bestCases[curr] || []), scenario];
    }

    // if neither player has a move in the scenario, skip it
    if (!movesTowardAiWin && !movesTowardHuWin) return;

    if (!movesMapByTarget[movesTowardAiWin]) {
      movesMapByTarget[movesTowardAiWin] = [];
    }
    if (!movesMapByTarget[movesTowardHuWin]) {
      movesMapByTarget[movesTowardHuWin] = [];
    }
    movesMapByTarget[movesTowardAiWin].push(scenario);
    movesMapByTarget[movesTowardHuWin].push(scenario);
  });

  let targetMoves = board.connectToWin - 1;

  while (targetMoves > 0) {
    if (bestCases[targetMoves]) {
      decision = hasAvailability(bestCases[targetMoves], freeSquares);
      if (decision > -1) break;
    }
    if (movesMapByTarget[targetMoves]) {
      const winScenarios = movesMapByTarget[targetMoves];
      decision = hasAvailability(winScenarios, freeSquares);
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

export default findGoodMove;
