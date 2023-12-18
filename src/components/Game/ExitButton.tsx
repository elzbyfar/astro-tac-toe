import { useStore } from "@nanostores/react";
import {
  activeGameStore,
  setActiveGame,
  statsStore,
  setStats,
  setResult,
  setMoveStack,
} from "../../lib/state";
import { INITIAL_RESULT, INITIAL_STATS } from "../../lib/constants";
export default function ExitButton() {
  const activeGame = useStore(activeGameStore);
  const stats = useStore(statsStore);

  function handleExit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setActiveGame(false);
    setStats({
      ...INITIAL_STATS,
      difficulty: stats.difficulty,
    });
    setResult(INITIAL_RESULT);
    setMoveStack([]);
  }
  return (
    <button
      className={`${
        activeGame ? "flex" : "hidden"
      } text-[12px] text-rose-400 mt-4 hover:text-rose-500, hover:bg-[#333333] py-2 px-4 rounded-xl transition-all duration-200 ease-in-out`}
      onClick={handleExit}
    >
      EXIT GAME
    </button>
  );
}
