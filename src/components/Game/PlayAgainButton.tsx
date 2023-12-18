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
    wrapper: "group box-border justify-center select-none",
    wrapperVisibility: `${activeRound ? "hidden" : "flex"}`,
    button: `relative flex items-center tracking-widest py-1 text-base h-full z-10 duration-100 ease-in-out rounded-md`,
    buttonActive: `${
      activeGame && !activeRound
        ? "bg-blue-400 px-4 text-white font-light"
        : "text-blue-900 font-extralight"
    }`,
    buttonActiveLg: `${
      activeGame && !activeRound
        ? "lg:group-hover:bg-blue-500 lg:group-hover:text-white lg:hover:shadow-[0_0_2px_1px_#afafaf]"
        : "lg:group-hover:text-blue-400"
    }`,
    text: "relative border-b-2 border-transparent ease-in-out group-hover:z-10",
    underlineLg: "lg:bg-blue-400 lg:h-1 lg:w-0 lg:ease-in-out lg:duration-300",
    underlineActiveLg: `${
      activeGame && !activeRound ? "" : "lg:group-hover:w-full"
    }`,
  };

  const styles = stylesReducer(className);

  return (
    <div className={styles("wrapper")}>
      <button
        onClick={activeGame ? (e) => handleRestart(e) : (e) => handleStart(e)}
        className={styles("button")}
      >
        <span style={{ fontFamily: "Jura" }} className={styles("text")}>
          PLAY AGAIN
          <div className={styles("underline")}></div>
        </span>
      </button>
    </div>
  );
}
