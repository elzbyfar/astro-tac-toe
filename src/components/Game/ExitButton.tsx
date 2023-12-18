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
      "text-[12px] text-rose-400 mt-4 py-0 px-4 rounded-xl transition-all duration-200 ease-in-out",
    buttonMd: "md:py-2",
    buttonVisibility: `${activeGame ? "flex" : "hidden"}`,
    buttonHoverLg: "lg:hover:bg-rose-400 lg:hover:text-white",
  };

  const styles = stylesReducer(className);

  return (
    <button className={styles("button")} onClick={handleExit}>
      EXIT GAME
    </button>
  );
}
