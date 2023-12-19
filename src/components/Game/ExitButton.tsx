import { useStore } from "@nanostores/react";
import {
  activeGameStore,
  setActiveGame,
  statsStore,
  setStats,
  setResult,
  setMoveStack,
  setActiveRound,
} from "../../lib/globalState";
import { INITIAL_RESULT, INITIAL_STATS } from "../../lib/constants";
import { stylesReducer } from "../../lib/utils";
import exit from "../../assets/exit.svg";

export default function ExitButton() {
  const activeGame = useStore(activeGameStore);
  const stats = useStore(statsStore);

  function handleExit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setActiveRound(false);
    setActiveGame(false);
    setMoveStack([]);
    setResult(INITIAL_RESULT);
    setStats({
      ...INITIAL_STATS,
      difficulty: stats.difficulty,
    });
  }

  const className = {
    button:
      "group absolute flex flex-col items-center top-2 right-0 text-[12px] rounded-full transition-all duration-200 ease-in-out z-50",
    buttonMd: "md:top-8 md:right-6",
    buttonVisibility: `${activeGame ? "flex" : "hidden"}`,
    buttonHoverLg: " ",
    icon: "w-6",
    text: "opacity-0 select-none group-hover:opacity-100 -mt-4 group-hover:mt-1 text-[9px] text-gray-400 transition-all duration-200 ease-in-out",
  };

  const styles = stylesReducer(className);

  return (
    <button className={styles("button")} onClick={handleExit}>
      <img src={exit.src} alt="exit button" className={styles("icon")} />
      <span className={styles("text")}>END GAME</span>
    </button>
  );
}
