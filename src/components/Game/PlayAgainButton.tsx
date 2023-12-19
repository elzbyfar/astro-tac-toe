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
    bgBlur: `transition-all duration-1000 ease-in-out absolute top-0 overflow-hidden left-0 w-full h-full z-[1]`,
    bgBlurVisibility: `${
      !activeRound ? "backdrop-blur-[7px] bg-slate/10" : "relative"
    }`,
    wrapper: "flex justify-center select-none overflow-hidden",
    button: `absolute bg-blue-400 px-4 text-slate-200 font-light top-1/2 -translate-y-[70%] tracking-widest py-2 z-10 duration-200 ease-in-out rounded-md text-sm`,
    buttonMd: "md:text-base",
    buttonVisibility: `${activeRound ? "hidden" : "flex"}`,
    buttonHoverLg:
      "lg:hover:bg-blue-500 lg:hover:text-white lg:hover:shadow-[0_0_8px_1px_#8f8f8f]",
  };

  const styles = stylesReducer(className);

  return (
    <div className={styles("wrapper")}>
      <div className={styles("bgBlur")}></div>
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
