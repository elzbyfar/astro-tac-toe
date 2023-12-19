import { useStore } from "@nanostores/react";
import undo from "../../assets/undo.svg";
import {
  activeRoundStore,
  isHumanTurnStore,
  moveStackStore,
  statsStore,
  setHint,
} from "../../lib/globalState";
import { findBestMove, stylesReducer } from "../../lib/utils";

export default function HintButton() {
  const activeRound = useStore(activeRoundStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const moveStack = useStore(moveStackStore);
  const stats = useStore(statsStore);

  function handleHint(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const forHuman = true;
    const hintSelection = findBestMove(moveStack, stats.difficulty, forHuman);

    setHint(hintSelection);
    setTimeout(() => {
      setHint(null);
    }, 600);
  }

  const className = {
    button:
      "flex flex-col items-center mx-auto py-2 w-16 rounded-full transition-all duration-300 ease-in-out",
    buttonDisabled:
      "disabled:hover:shadow-none select-none disabled:opacity-30 disabled:bg-transparent",
    buttonHoverLg: "lg:hover:shadow-[0_0_5px_1px_#afafaf] lg:hover:bg-blue-200",
    icon: "transition-all duration-300 ease-in-out w-5",
    iconMd: "md:w-7",
    text: "text-[10px] text-gray-500",
  };

  const styles = stylesReducer(className);

  return (
    <button
      className={styles("button")}
      onClick={handleHint}
      disabled={!activeRound || !isHumanTurn}
    >
      <img
        src={undo.src} // same as undo icon, but styled differently
        alt="hint button"
        style={{ transform: "scaleX(-1)" }}
        className={styles("icon")}
      />
      <span style={{ fontFamily: "Jura" }} className={styles("text")}>
        HINT
      </span>
    </button>
  );
}
