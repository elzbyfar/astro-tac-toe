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
} from "../../lib/globalState.ts";
import { INITIAL_RESULT } from "../../lib/constants.ts";
import { stylesReducer } from "../../lib/utils.ts";

export default function PlayAgainButton() {
  const activeGame = useStore(activeGameStore);
  const activeRound = useStore(activeRoundStore);
  const stats = useStore(statsStore);
  const result = useStore(resultStore);

  type ReactMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  function handleStart(event: ReactMouseEvent) {
    event.preventDefault();
    setActiveGame(true);
    setActiveRound(true);
  }

  function handleRestart(event: ReactMouseEvent) {
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

  const className = {
    wrapper: "flex justify-center select-none overflow-hidden",
    button: `absolute top-1/2 -translate-y-[83%] tracking-widest py-2 z-10 duration-100 ease-in-out rounded-md text-xs`,
    buttonVisibility: `${activeRound ? "hidden" : "flex"}`,
    buttonActive: "bg-blue-400 px-4 text-white font-light",
    buttonActiveLg:
      "lg:group-hover:bg-blue-500 lg:group-hover:text-white lg:hover:shadow-[0_0_2px_1px_#afafaf]",
  };

  const styles = stylesReducer(className);

  return (
    <div className={styles("wrapper")}>
      <button
        onClick={activeGame ? (e) => handleRestart(e) : (e) => handleStart(e)}
        className={styles("button")}
        style={{ fontFamily: "Jura" }}
      >
        PLAY AGAIN
      </button>
    </div>
  );
}
