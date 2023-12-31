import { useStore } from "@nanostores/react";
import { findBestMove, getEmptySquares } from "../../utils";
import { findWinner } from "../../utils";
import { useStyles } from "../../hooks";
import type { ChatEntry, Move, Result } from "../../lib/types";
import {
  activeGameStore,
  activeRoundStore,
  boardStore,
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
  chatLogStore,
  setChatLog,
} from "../../lib/globalState.ts";
import "../../styles/square.css";
import { getEndGameMessage } from "../../api/openAI.ts";

export default function Square({ index: squareIndex }: { index: number }) {
  const activeGame = useStore(activeGameStore);
  const activeRound = useStore(activeRoundStore);
  const moveStack = useStore(moveStackStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const undidPrevMove = useStore(undidPrevMoveStore);
  const result = useStore(resultStore);
  const stats = useStore(statsStore);
  const hint = useStore(hintStore);
  const board = useStore(boardStore);
  const chatLog = useStore(chatLogStore);

  const handleEndMessage = async (outcome: string) => {
    const response = await getEndGameMessage(outcome, chatLog);
    if (response) {
      const chatEntry: ChatEntry = {
        id: (chatLog.at(-1)?.id || 0) + 1,
        author: "chat-gpt",
        content: response,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatLog([...chatLog, chatEntry]);
    }
  };

  const gameIsOver = (player: string, updatedStack: Move[]) => {
    const winningSquares = findWinner(player, updatedStack, board.area);
    const emptySquares = getEmptySquares(updatedStack, board.area);
    let outcome = "";

    if (winningSquares) {
      outcome = player === "X" ? "Won" : "Lost";
      handleUpdateStats({
        status: player === "X" ? "HUMAN WINS" : "AI WINS",
        winningSquares,
      });
    } else if (emptySquares.length === 0) {
      outcome = "Tied";
      handleUpdateStats({
        status: "TIE",
        winningSquares: [],
      });
    }
    if (winningSquares || emptySquares.length === 0) {
      handleEndMessage(outcome);
      return true;
    }
    return false;
  };

  const handlePlay = (index: number) => {
    if (activeGame === false || activeRound === false) return;
    if (undidPrevMove) {
      setUndidPrevMove(false);
    }
    setIsHumanTurn(false);
    const humanMove = { player: "X", index: index! };
    const updatedStack = [...moveStack, humanMove];
    setMoveStack(updatedStack);
    if (gameIsOver("X", updatedStack)) return;

    setTimeout(async () => {
      // wait a second to generate AI's turn
      const aiSelection = await findBestMove(
        updatedStack,
        stats.difficulty,
        board,
      );
      const aiMove = { player: "O", index: aiSelection };
      setMoveStack([...updatedStack, aiMove]);
      setIsHumanTurn(true);
      if (gameIsOver("O", [...updatedStack, aiMove])) return;
    }, 700);
  };

  const handleUpdateStats = (currResult: Result) => {
    setResult(currResult);
    if (currResult.status === "HUMAN WINS") {
      setStats({
        ...stats,
        wins: stats.wins + 1,
      });
    } else if (currResult.status === "AI WINS") {
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
  };

  const handleColor = (index: number) => {
    if (!activeRound) {
      const { winningSquares } = result;
      if (!winningSquares.includes(index)) {
        return "rgb(0 0 0 / 0.2)";
      }
    }

    const player = moveStack.find((move) => move.index === index)?.player;
    if (player === "X") return "rgb(96 165 250)";
    return "rgb(251 113 133)";
  };

  const areaToSquareSize: { [key: number]: string } = {
    9: "md:h-[140px] md:w-[140px] h-[80px] w-[80px] md:text-[5rem] text-[2.85rem]",
    25: "md:h-[84px] md:w-[84px] h-[48px] w-[48px] md:text-[3.5rem] text-[2rem]",
    49: "md:h-[60px] md:w-[60px] h-[34.28px] w-[34.28px] md:text-[2.5rem] text-[1.5rem]",
  };

  const isDisabled =
    !activeRound ||
    !isHumanTurn ||
    Boolean(moveStack.find((move: Move) => move.index === squareIndex));

  const className = {
    square: `square relative justify-center items-center transition ease-in-out duration-300 disabled:bg-transparent hover:bg-[#00000010]`,
    squareSize: areaToSquareSize[board.area],
    squareWithHint: `${hint === squareIndex ? "bg-blue-400/30" : ""}`,
  };

  const styles = useStyles(className);

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
