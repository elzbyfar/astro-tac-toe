import { useStore } from "@nanostores/react";
import undo from "../../assets/undo.svg";
import {
  activeRoundStore,
  isHumanTurnStore,
  moveStackStore,
  statsStore,
  setHint,
} from "../../lib/state";
import { findBestMove } from "../../lib/utils";

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

  return (
    <button
      className="flex flex-col items-center justify-center disabled:opacity-30 disabled:bg-transparent hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_5px_1px_#afafaf] disabled:hover:shadow-none select-none"
      onClick={(e) => handleHint(e)}
      disabled={!activeRound || !isHumanTurn}
    >
      <img
        src={undo.src} // same icon styled differently
        alt="hint button"
        width="28px"
        height="28px"
        style={{
          transform: "scaleX(-1)",
        }}
        className="transition-all duration-300 ease-in-out"
      />
      <span style={{ fontFamily: "Jura" }} className="text-[10px]">
        HINT
      </span>
    </button>
  );
}
