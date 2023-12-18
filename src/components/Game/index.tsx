import { useStore } from "@nanostores/react";
import { activeGameStore } from "../../lib/state.ts";

import Title from "./Title.tsx";
import Board from "./Board.tsx";
import ActiveStats from "./ActiveStats.tsx";
import SelectDifficulty from "./SelectDifficulty.tsx";
import HintButton from "./HintButton.tsx";
import UndoButton from "./UndoButton.tsx";
import StartOrRestart from "./StartOrRestart.tsx";
import ExitButton from "./ExitButton.tsx";

export default function Game() {
  const activeGame = useStore(activeGameStore);

  const className = {
    card: "w-[450px] transition-all duration-300 bg-slate-50 z-10 py-6 flex flex-col rounded-xl justify-evenly items-center opacity-100 shadow-[0_0_20px_3px_#afafaf] px-10",
    blurredOverlay: `${
      activeGame ? "backdrop-blur-sm bg-slate-50/70" : ""
    } transition-all duration-700 ease-in absolute top-0 left-0 w-full h-full z-[1]`,
    gameButtonsWrapper: `${
      activeGame ? "flex" : "hidden"
    } justify-between w-full px-[42px] py-8`,
  };

  return (
    <>
      <div className={className.blurredOverlay}></div>
      <div className={className.card}>
        <Title />
        <ActiveStats />
        <SelectDifficulty />
        <Board />
        <div className={className.gameButtonsWrapper}>
          <UndoButton />
          <HintButton />
        </div>
        <StartOrRestart />
        <ExitButton />
      </div>
    </>
  );
}
