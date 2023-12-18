import { useStore } from "@nanostores/react";
import { activeGameStore } from "../../lib/globalState.ts";
import { stylesReducer } from "../../lib/utils.ts";

import Title from "./Title.tsx";
import Board from "./Board.tsx";
import ActiveStats from "./ActiveStats.tsx";
import SelectDifficulty from "./SelectDifficulty.tsx";
import HintButton from "./HintButton.tsx";
import UndoButton from "./UndoButton.tsx";
import StartButton from "./StartButton.tsx";
import ExitButton from "./ExitButton.tsx";
import PlayAgainButton from "./PlayAgainButton.tsx";

export default function Game() {
  const activeGame = useStore(activeGameStore);

  const className = {
    card: "w-[90%] transition-all duration-300 bg-slate-50 z-10 py-6 flex flex-col rounded-md justify-evenly items-center opacity-100 shadow-[0_0_20px_3px_#afafaf] px-10",
    cardMd: "md:max-w-screen-sm",
    bgBlur: `transition-all duration-700 ease-in absolute top-0 left-0 w-full h-full z-[1]`,
    bgBlurVisibility: `${activeGame ? "backdrop-blur-xs bg-slate-50/70" : ""}`,
    gameButtons: `justify-between w-full px-0 py-2`,
    gameButtonsMd: "md:px-10 md:py-8",
    gameButtonsVisibility: `${activeGame ? "flex" : "hidden"}`,
  };

  const styles = stylesReducer(className);

  return (
    <>
      <div className={styles("bgBlur")}></div>
      <div className={styles("card")}>
        <Title />

        <SelectDifficulty />
        <Board />
        <div className={styles("gameButtons")}>
          <UndoButton />
          <PlayAgainButton />
          <HintButton />
        </div>
        <StartButton />
        {/* <ExitButton /> */}
        <ActiveStats />
      </div>
    </>
  );
}
