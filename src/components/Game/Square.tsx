import { useStore } from "@nanostores/react";
import { findBestMove, findWinner, findTie } from "../../lib/utils.ts";
import type { Move, Result } from "../../lib/types";
import {
  activeGameStore,
  activeRoundStore,
  moveStackStore,
  isHumanTurnStore,
  undidPrevMoveStore,
  resultStore,
  statsStore,
  hintStore,
  setActiveRound,
  setUndidPrevMove,
  setStats,
  setResult,
  setMoveStack,
  setIsHumanTurn,
} from "../../lib/globalState.ts";
import "../../styles/square.css";
import { stylesReducer } from "../../lib/utils.ts";

export default function Square({ index: squareIndex }: { index: number }) {
  const activeGame = useStore(activeGameStore);
  const activeRound = useStore(activeRoundStore);
  const moveStack = useStore(moveStackStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const undidPrevMove = useStore(undidPrevMoveStore);
  const result = useStore(resultStore);
  const stats = useStore(statsStore);
  const hint = useStore(hintStore);

  function gameIsOver(player: string, updatedStack: Move[]) {
    const winner = findWinner(player, updatedStack);
    if (winner) {
      const { indexes, direction } = winner || {};
      handleUpdateStats({
        status: player === "X" ? "winner" : "loser",
        winningSquares: indexes,
        direction,
      });
      return true;
    }

    const tie = findTie(updatedStack);
    if (tie) {
      handleUpdateStats({
        status: "draw",
        winningSquares: [],
        direction: "",
      });
      return true;
    }
    return false;
  }

  function handlePlay(index: number) {
    if (activeGame === false || activeRound === false) return;
    if (undidPrevMove) {
      setUndidPrevMove(false);
    }
    setIsHumanTurn(false);
    const humanMove = { player: "X", index: index! };
    const updatedStack = [...moveStack, humanMove];
    setMoveStack(updatedStack);
    if (gameIsOver("X", updatedStack)) return;

    setTimeout(() => {
      // wait a second to generate AI's turn
      const aiSelection = findBestMove(updatedStack, stats.difficulty);
      const aiMove = { player: "O", index: aiSelection };
      setMoveStack([...updatedStack, aiMove]);
      setIsHumanTurn(true);
      if (gameIsOver("O", [...updatedStack, aiMove])) return;
    }, 700);
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
    setActiveRound(false);
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
    square: `square relative justify-center text-[3rem] items-center h-20 w-20 transition ease-in-out duration-300 disabled:bg-transparent hover:bg-[#00000010]`,
    squareMd: "md:h-32 md:w-32 md:text-[5rem]",
    squareWithHint: `${hint === squareIndex ? "bg-blue-400/30" : ""}`,
  };

  const styles = stylesReducer(className);

  const isDisabled =
    !activeRound ||
    !isHumanTurn ||
    Boolean(moveStack.find((move: Move) => move.index === squareIndex));

  return (
    <button
      className={styles("square")}
      style={{ fontFamily: "Bungee", color: handleColor(squareIndex) }}
      onClick={() => handlePlay(squareIndex)}
      disabled={isDisabled}
    >
      {moveStack.find((move: Move) => move.index === squareIndex)?.player ?? ""}
    </button>
  );
}
