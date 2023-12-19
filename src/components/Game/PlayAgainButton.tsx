import { useStore } from "@nanostores/react";
import { stylesReducer } from "../../lib/utils.ts";
import { INITIAL_RESULT } from "../../lib/constants.ts";
import {
  resultStore,
  activeRoundStore,
  statsStore,
  setIsHumanTurn,
  setMoveStack,
  setActiveRound,
  setStats,
  setResult,
} from "../../lib/globalState.ts";
import type { ReactMouseEvent } from "../../lib/types.ts";

export default function PlayAgainButton() {
  const activeRound = useStore(activeRoundStore);
  const stats = useStore(statsStore);
  const result = useStore(resultStore);

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
    button: `absolute bg-blue-400 px-4 text-white font-light top-1/2 -translate-y-[70%] tracking-widest py-2 z-10 duration-200 ease-in-out rounded-md text-sm`,
    buttonMd: "md:text-base ",
    buttonLg: "lg:text-slate-200",
    buttonVisibility: `${activeRound ? "hidden" : "flex"}`,
    buttonHoverLg:
      "lg:hover:bg-blue-500 lg:hover:text-white lg:hover:shadow-[0_0_8px_1px_#8f8f8f]",
  };

  const styles = stylesReducer(className);

  return (
    <div className={styles("wrapper")}>
      <div className={styles("bgBlur")}></div>
      <button
        onClick={handleRestart}
        className={styles("button")}
        style={{ fontFamily: "Jura" }}
      >
        PLAY AGAIN
      </button>
    </div>
  );
}
