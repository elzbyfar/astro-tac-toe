import { useStore } from "@nanostores/react";
import {
  resultStore,
  activeGameStore,
  activeRoundStore,
  statsStore,
  setIsHumanTurn,
  setMoveStack,
  setActiveGame,
  setActiveRound,
  setStats,
  setResult,
} from "../../lib/state";
import { INITIAL_RESULT } from "../../lib/constants.ts";

export default function StartOrRestart() {
  const activeGame = useStore(activeGameStore);
  const activeRound = useStore(activeRoundStore);
  const stats = useStore(statsStore);
  const result = useStore(resultStore);

  function handleStart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setActiveGame(true);
    setActiveRound(true);
  }

  function handleRestart(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    setStats({
      ...stats,
      round: stats.round + 1,
      losses: result.status === "" ? stats.losses + 1 : stats.losses,
    });
    setIsHumanTurn(true);
    setActiveRound(true);
    setMoveStack([]);
    setResult(INITIAL_RESULT);
  }

  return (
    <div className="group flex box-border justify-center select-none">
      <button
        onClick={activeGame ? (e) => handleRestart(e) : (e) => handleStart(e)}
        className={`${
          activeGame && !activeRound
            ? "bg-blue-400 px-4 text-white font-light group-hover:bg-blue-500 group-hover:text-white hover:shadow-[0_0_2px_1px_#afafaf]"
            : "text-blue-900 font-extralight group-hover:text-blue-400"
        } relative flex items-center tracking-widest pt-1 text-base h-full z-10 duration-100 ease-in-out rounded-md`}
      >
        <span
          style={{ fontFamily: "Jura" }}
          className="relative border-b-2 border-transparent ease-in-out group-hover:z-10"
        >
          {activeGame ? "RESTART" : "START"}
          <div
            className={`${
              activeGame && !activeRound ? "" : "group-hover:w-full"
            } bg-blue-400 h-1 w-0 ease-in-out duration-300`}
          ></div>
        </span>
      </button>
    </div>
  );
}
