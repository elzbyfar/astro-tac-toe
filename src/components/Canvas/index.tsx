import { useState } from "react";
import type { MouseEvent, ChangeEvent } from "react";
import type { Move, Result, Stats } from "../../lib/types.ts";
import SelectDifficulty from "./SelectDifficulty";
import StartOrRestart from "./StartOrRestart";
import Title from "./Title";
import {
  INITIAL_RESULT,
  INITIAL_STATS,
  WINNING_SCENARIOS,
} from "../../lib/constants.ts";
import { checkWinner, checkTie, findEmptySpots } from "../../lib/utils.ts";
import "../../styles/square.css";

export default function Canvas() {
  const [activeGame, setActiveGame] = useState<boolean>(false);
  const [activeRound, setActiveRound] = useState<boolean>(false);
  const [humanTurn, setHumanTurn] = useState<boolean>(false);
  const [moveStack, setMoveStack] = useState<Move[]>([]);
  const [result, setResult] = useState<Result>(INITIAL_RESULT);
  const [stats, setStats] = useState<Stats>(INITIAL_STATS);

  function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    setStats({
      ...stats,
      difficulty: event.target.value,
    });
  }

  function handleStartGame(event: MouseEvent<HTMLButtonElement>) {
    setActiveGame(true);
    setActiveRound(true);
  }

  function handleUpdateStats(currResult: Result) {
    setResult(currResult);
    if (currResult.status === "winner") {
      setStats({
        ...stats,
        wins: stats.wins + 1,
      });
    } else if (currResult.status === "loser") {
      setStats({
        ...stats,
        losses: stats.losses + 1,
      });
    } else {
      setStats({
        ...stats,
        draws: stats.draws + 1,
      });
    }
  }

  function gameIsOver(player: string, updatedStack: Move[]) {
    const foundWinner = checkWinner(player, updatedStack);
    if (foundWinner) {
      const { indexes, direction } = foundWinner || {};
      handleUpdateStats({
        status: player === "X" ? "winner" : "loser",
        winningSquares: indexes,
        direction,
      });
      setMoveStack(updatedStack);
      setActiveRound(false);
      return true;
    }

    const foundTie = checkTie(updatedStack);
    if (foundTie) {
      handleUpdateStats({
        status: "draw",
        winningSquares: [],
        direction: "",
      });
      setMoveStack(updatedStack);
      setActiveRound(false);
      return true;
    }
    return false;
  }

  function makeBestChoice(updatedStack?: Move[], forHuman?: boolean) {
    const { difficulty } = stats;
    const availableSquares = findEmptySpots(updatedStack || moveStack);

    let choice = -1;
    if (availableSquares.length) {
      if (forHuman || difficulty === "unbeatable") {
        const result = minimax(updatedStack || moveStack, forHuman ? "X" : "O");
        choice = result.index;
      } else if (difficulty === "easy") {
        const random = Math.floor(Math.random() * availableSquares.length);
        choice = availableSquares[random];
      } else {
        choice = blockOrWin(updatedStack || moveStack);
      }
    }
    return choice;
  }

  function blockOrWin(updatedStack: Move[]) {
    const aiSquares = [] as number[];
    const humanSquares = [] as number[];

    updatedStack.forEach((move) => {
      if (move.player === "O") {
        aiSquares.push(move.index);
      } else {
        humanSquares.push(move.index);
      }
    });

    const { mustPlay: aiMustPlay, canPlay: aiCanPlay } = canWinOrShouldPlay(
      humanSquares,
      updatedStack,
    );

    const { mustPlay: humanMustProtect } = canWinOrShouldPlay(
      aiSquares,
      updatedStack,
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

  function canWinOrShouldPlay(
    occupiedByPlayer: number[],
    updatedStack: Move[],
  ) {
    const availableSquares = findEmptySpots(updatedStack);

    let mostMovesTowardWin = 0;
    const movesTowardWinByScenario = WINNING_SCENARIOS.map((scenario) => {
      const { indexes } = scenario;
      const isPlayable = indexes.some((index) =>
        availableSquares.includes(index),
      );
      if (!isPlayable) return 0;
      let movesTowardWin = 0;

      indexes.forEach((index) => {
        if (occupiedByPlayer.includes(index)) {
          movesTowardWin++;
        }
      });

      if (movesTowardWin > mostMovesTowardWin) {
        mostMovesTowardWin = movesTowardWin;
      }
      return movesTowardWin;
    });

    const decisions = {
      mustPlay: -1 as number | undefined,
      canPlay: [] as number[],
    };

    if (mostMovesTowardWin === 2) {
      const bestScenarioIndex = movesTowardWinByScenario.indexOf(2);
      const bestScenario = WINNING_SCENARIOS[bestScenarioIndex];
      decisions.mustPlay = bestScenario.indexes.find((index) =>
        availableSquares.includes(index),
      );
    } else if (mostMovesTowardWin === 1) {
      const bestScenarioIndexes = movesTowardWinByScenario.reduce(
        (acc, curr, index) => {
          if (curr === 1) acc.push(index);
          return acc;
        },
        [] as number[],
      );
      decisions.canPlay = bestScenarioIndexes
        .map((index) =>
          WINNING_SCENARIOS[index].indexes.filter((idx: number) =>
            availableSquares.includes(idx),
          ),
        )
        .flat() as number[];
    }
    return decisions as { mustPlay: number; canPlay: number[] };
  }

  function minimax(updatedStack: Move[], player: string) {
    const availableSquares = findEmptySpots(updatedStack);

    if (checkWinner("X", updatedStack)) {
      return { index: -1, score: -10 };
    } else if (checkWinner("O", updatedStack)) {
      return { index: -1, score: 10 };
    } else if (availableSquares.length === 0) {
      return { index: -1, score: 0 };
    }

    const moves = [] as { index: number; score: number }[];
    availableSquares.forEach((index) => {
      const move = { index: -1, score: -100 };
      move.index = index;
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

  function handlePlay(index: number) {
    if (activeGame === false || activeRound === false) return;

    const updatedStack = [...moveStack];
    const humanMove = { player: "X", index: index! };
    updatedStack.push(humanMove);
    if (gameIsOver("X", updatedStack)) return;
    setMoveStack(updatedStack);

    const aiSelection = makeBestChoice(updatedStack);
    const aiMove = { player: "O", index: aiSelection };

    setTimeout(() => {
      if (gameIsOver("O", [...updatedStack, aiMove])) return;
      setMoveStack([...updatedStack, aiMove]);
    }, 1000);
  }

  function handleRestartRound() {
    setActiveRound(true);
    setMoveStack([]);
    setResult(INITIAL_RESULT);
  }

  function handleColor(index: number) {
    if (!activeRound) {
      const { winningSquares } = result;
      if (!winningSquares.includes(index)) {
        return "rgb(0 0 0 / 0.2)";
      }
    }

    const player = moveStack.find((move) => move.index === index)?.player;
    if (player === "X") return "rgb(96 165 250)";
    return "rgb(251 113 133)";
  }

  const className = {
    card: "w-[22rem] transition-all duration-300 bg-slate-50 z-10 py-4 flex flex-col rounded-xl justify-evenly items-center opacity-100 shadow-[0_0_20px_8px_#afafaf]",
    blurredOverlay: `${
      activeGame ? "backdrop-blur-sm bg-slate-50/70" : ""
    } transition-all duration-700 ease-in absolute top-0 left-0 w-full h-full z-[1]`,
  };

  return (
    <>
      <div className={className.blurredOverlay}></div>
      <div className={className.card}>
        <Title />
        <SelectDifficulty
          gameDifficulty={stats.difficulty}
          setGameDifficulty={handleDifficultyChange}
        />
        <div
          className={`${
            activeGame ? "h-[15rem]" : "h-0"
          } duration-300 transition-all overflow-hidden box-border w-[15rem] flex flex-wrap`}
        >
          {Array.from({ length: 9 }).map((_, idx) => (
            <button
              key={idx}
              className="square relative justify-center text-6xl items-center h-20 w-20 transition ease-in-out duration-300 disabled:bg-transparent hover:bg-[#00000010]"
              style={{ fontFamily: "Bungee", color: handleColor(idx) }}
              onClick={() => handlePlay(idx)}
              disabled={
                !activeRound ||
                Boolean(moveStack.find((move) => move.index === idx))
              }
            >
              {moveStack.find((move) => move.index === idx)?.player ?? ""}
            </button>
          ))}
        </div>
        <StartOrRestart
          handleStart={handleStartGame}
          handleRestart={handleRestartRound}
          activeGame={activeGame}
        />
      </div>
    </>
  );
}
