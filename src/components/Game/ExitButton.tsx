import { useStore } from "@nanostores/react";
import {
  activeGameStore,
  setActiveGame,
  statsStore,
  setStats,
  setResult,
  setMoveStack,
  setActiveRound,
} from "../../lib/state";
import { INITIAL_RESULT, INITIAL_STATS } from "../../lib/constants";
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
  return (
    <button
      className={`${
        activeGame ? "flex" : "hidden"
      } text-[12px] text-rose-400 mt-4 hover:bg-rose-400 hover:text-white py-2 px-4 rounded-xl transition-all duration-200 ease-in-out`}
      onClick={handleExit}
    >
      EXIT GAME
    </button>
  );
}
