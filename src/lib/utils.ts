import { useStore } from "@nanostores/react";
import {
  activeGameStore,
  activeRoundStore,
  moveStackStore,
  isHumanTurnStore,
  undidPrevMoveStore,
  resultStore,
  statsStore,
  setStats,
  setResult,
  setMoveStack,
  setActiveRound,
  setIsHumanTurn,
  setUndidPrevMove,
} from "./state";

import type { Move, Result, StyleObject } from "./types";
import { WINNING_SCENARIOS } from "./constants";

export function findWinner(player: string, moves: Move[]) {
  const allMovesByPlayer = moves.reduce((movesList, move) => {
    if (move.player === player) movesList.push(move.index);
    return movesList;
  }, [] as number[]);

  const foundWinner = WINNING_SCENARIOS.find((scenario) =>
    scenario.indexes.every((idx) => allMovesByPlayer.includes(idx)),
  );

  return foundWinner;
}

export const findTie = (moves: Move[]) => findEmptySpots(moves).length === 0;

export function findEmptySpots(moves: Move[]) {
  const allIndexes = Array.from(Array(9).keys());
  const availableSquares = allIndexes.filter(
    (idx) => !moves.find((move) => move.index === idx),
  );
  return availableSquares;
}

export function findGoodMoves(
  occupiedByPlayer: number[],
  updatedStack: Move[],
) {
  const emptySpots = findEmptySpots(updatedStack);

  let mostGoodMoves = 0;
  const movesTowardWin = WINNING_SCENARIOS.map((scenario) => {
    const { indexes } = scenario;
    const isPlayable = indexes.some((index) => emptySpots.includes(index));
    if (!isPlayable) return 0;
    let movesTowardWin = 0;

    indexes.forEach((index) => {
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
    const scenario = WINNING_SCENARIOS[goodMove];
    decisions.mustPlay = scenario.indexes.find((index) =>
      emptySpots.includes(index),
    );
  } else if (mostGoodMoves === 1) {
    const goodScenarios = movesTowardWin.reduce((acc, curr, index) => {
      if (curr === 1) acc.push(index);
      return acc;
    }, [] as number[]);
    decisions.canPlay = goodScenarios
      .map((index) =>
        WINNING_SCENARIOS[index].indexes.filter((idx: number) =>
          emptySpots.includes(idx),
        ),
      )
      .flat() as number[];
  }
  return decisions as { mustPlay: number; canPlay: number[] };
}

export function minimax(updatedStack: Move[], player: string) {
  const emptySpots = findEmptySpots(updatedStack);

  if (findWinner("X", updatedStack)) {
    return { index: -1, score: -10 };
  } else if (findWinner("O", updatedStack)) {
    return { index: -1, score: 10 };
  } else if (emptySpots.length === 0) {
    return { index: -1, score: 0 };
  }

  const moves = [] as { index: number; score: number }[];
  emptySpots.forEach((index) => {
    const move = { index, score: 0 };
    updatedStack.push({ player, index });

    if (player === "O") {
      const result = minimax(updatedStack, "X");
      move.score = result.score;
    } else {
      const result = minimax(updatedStack, "O");
      move.score = result.score;
    }

    updatedStack.pop();
    moves.push(move);
  });

  let bestMove = -1;
  if (player === "O") {
    let bestScore = -Infinity;
    moves.forEach((move, index) => {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = index;
      }
    });
  } else {
    let bestScore = Infinity;
    moves.forEach((move, index) => {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = index;
      }
    });
  }
  return moves[bestMove];
}

export function findBestMove(
  updatedStack: Move[],
  difficulty: string,
  forHuman?: boolean,
) {
  const emptySpots = findEmptySpots(updatedStack);

  let choice = -1;
  if (emptySpots.length) {
    if (forHuman || difficulty === "unbeatable") {
      const result = minimax(updatedStack, forHuman ? "X" : "O");
      choice = result.index;
    } else if (difficulty === "easy") {
      const random = Math.floor(Math.random() * emptySpots.length);
      choice = emptySpots[random];
    } else {
      choice = blockOrWin(updatedStack);
    }
  }
  return choice;
}

export function blockOrWin(updatedStack: Move[]) {
  const aiSquares = [] as number[];
  const humanSquares = [] as number[];

  updatedStack.forEach((move) => {
    if (move.player === "O") {
      aiSquares.push(move.index);
    } else {
      humanSquares.push(move.index);
    }
  });

  const { mustPlay: aiMustPlay, canPlay: aiCanPlay } = findGoodMoves(
    humanSquares,
    updatedStack,
  );

  const { mustPlay: humanMustProtect } = findGoodMoves(aiSquares, updatedStack);

  if (humanMustProtect > -1) {
    return humanMustProtect;
  }
  if (aiMustPlay > -1) {
    return aiMustPlay;
  }

  const random = Math.floor(Math.random() * aiCanPlay.length);
  return aiCanPlay[random];
}

export function stylesReducer(styleObject: StyleObject) {
  // this function takes a style object and returns a function that
  // trades a base string for a string containing tailwind classes for all breakpoints

  return (input: string | string[]) => {
    let classes: string = "";

    const bases: string[] = Array.isArray(input) ? input : [input];
    for (const base of bases) {
      for (const [key, styles] of Object.entries(styleObject)) {
        if (key.startsWith(base)) {
          classes += styles + " ";
        }
      }
    }
    return classes;
  };
}
