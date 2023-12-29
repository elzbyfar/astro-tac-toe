import { useStore } from "@nanostores/react";
import {
  activeGameStore,
  statsStore,
  setStats,
  boardStore,
  setBoard,
} from "../../lib/globalState.ts";
import { useStyles } from "../../hooks";

import Title from "./Title.tsx";
import Board from "./Board.tsx";
import ActiveStats from "./ActiveStats.tsx";
import HintButton from "./HintButton.tsx";
import UndoButton from "./UndoButton.tsx";
import StartButton from "./StartButton.tsx";
import ExitButton from "./ExitButton.tsx";
import PlayAgainButton from "./PlayAgainButton.tsx";
import Select from "./Select.tsx";
import { BOARDS, GAME_DIFFICULTIES } from "../../lib/constants.ts";
import type { ChangeEvent } from "react";

export default function Game() {
  const activeGame = useStore(activeGameStore);
  const stats = useStore(statsStore);
  const board = useStore(boardStore);

  const className = {
    card: "relative w-[90%] -translate-y-16 transition-all duration-300 bg-slate-50 z-10 py-6 flex flex-col rounded-md justify-evenly items-center opacity-100",
    cardGlow: `${activeGame ? "" : "shadow-[0_0_35px_1px_#afafaf]"}`,
    cardMd: "md:max-w-screen-sm",
    bgBlur: `transition-all duration-700 ease-in absolute top-0 left-0 w-full h-full z-[1]`,
    bgBlurVisibility: `${activeGame ? "bg-slate-700/70" : ""}`,
    inGameButtons: `grid grid-cols-3 w-full px-[54px] pb-2`,
    inGameButtonsMd: "md:px-32",
    inGameButtonsVisibility: `${activeGame ? "flex" : "hidden"}`,
    selectWrapper: "flex flex-col items-center justify-center py-4",
  };

  const styles = useStyles(className);

  function handleDifficultyChange(event: ChangeEvent<HTMLSelectElement>) {
    const index = Number(event.target.value);
    setStats({
      ...stats,
      difficulty: GAME_DIFFICULTIES[index],
    });
  }

  function handleBoardChange(event: ChangeEvent<HTMLSelectElement>) {
    const value = Number(event.target.value);
    if (value > 9 && stats.difficulty === "AI") {
      setStats({
        ...stats,
        difficulty: "SMART",
      });
    }
    setBoard(BOARDS.find((board) => board.area === value) || BOARDS[0]);
  }

  return (
    <>
      <div className={styles("bgBlur")}></div>
      <div className={styles("card")}>
        <Title />
        <ExitButton />
        <div className={styles("selectWrapper")}>
          <Select
            label="MODE"
            value={GAME_DIFFICULTIES.indexOf(stats.difficulty)}
            handleChange={handleDifficultyChange}
            menuOptions={GAME_DIFFICULTIES.map((difficulty, idx) => ({
              value: idx,
              label: difficulty,
              disabled: board.area > 9 && difficulty === "AI",
            }))}
          />
          <Select
            label="BOARD"
            value={board.area}
            handleChange={handleBoardChange}
            menuOptions={BOARDS.map((board) => ({
              value: board.area,
              label: board.label,
            }))}
          />
        </div>
        <Board />
        <div className={styles("inGameButtons")}>
          <UndoButton />
          <PlayAgainButton />
          <HintButton />
        </div>
        <StartButton />
        <ActiveStats />
      </div>
    </>
  );
}
