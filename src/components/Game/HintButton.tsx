import { useStore } from "@nanostores/react";
import undo from "../../assets/undo.svg";
import {
  activeRoundStore,
  isHumanTurnStore,
  moveStackStore,
  statsStore,
  boardStore,
  setHint,
} from "../../lib/globalState";
import { useStyles } from "../../hooks";
import { findBestMove } from "../../utils";
import Tooltip from "./Tooltip";

export default function HintButton() {
  const activeRound = useStore(activeRoundStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const moveStack = useStore(moveStackStore);
  const stats = useStore(statsStore);
  const board = useStore(boardStore);

  async function handleHint(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    const forHuman = true;
    const hintSelection = await findBestMove(
      moveStack,
      stats.difficulty,
      board,
      forHuman,
    );

    setHint(hintSelection);
    setTimeout(() => {
      setHint(null);
    }, 600);
  }

  const className = {
    wrapper:
      "group relative pt-4 pb-8 flex flex-col items-center justify-center select-none",
    button:
      "group flex flex-col items-center justify-center mx-auto w-16 rounded-full",
    buttonDisabled: " disabled:opacity-30 disabled:bg-transparent",
    icon: "transition-all duration-300 ease-in-out w-5",
    iconMd: "md:w-7",
    text: "text-[10px] text-gray-500",
    boardAreaWarning:
      "absolute w-40 opacity-0 mt-4 text-[10px] bg-[#fb7171] text-white text-center transition-all duration-100 ease-in-out rounded-sm",
    boardAreaWarningVisibility: `${board.area === 9 ? "hidden" : ""}`,
    boardAreaWarningHoverLg: "lg:group-hover:opacity-100 lg:group-hover:mt-12",
    tooltip:
      "absolute w-40 opacity-0 mt-4 text-[10px] shadow-[0_1px_0px_#777777] bg-white text-black text-center transition-all duration-100 ease-in-out rounded-md",
    tooltipVisibility: `${
      !activeRound || !isHumanTurn || board.area > 9 ? "hidden" : ""
    }`,
    tooltipHoverLg: "lg:group-hover:opacity-100 lg:group-hover:-mt-6",
    triangle:
      "absolute w-0 h-0 opacity-0 transition-all duration-100 ease-in-out border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent border-t-[6px] border-t-white drop-shadow-[0_1px_0px_#777777]",
    triangleVisibility: `${
      !activeRound || !isHumanTurn || board.area > 9 ? "hidden" : ""
    }`,
    triangleHoverLg: "lg:group-hover:opacity-100 lg:group-hover:-mt-[9px]",
  };

  const styles = useStyles(className);

  return (
    <div className={styles("wrapper")}>
      <button
        className={styles("button")}
        onClick={handleHint}
        disabled={!activeRound || !isHumanTurn || board.area > 9}
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
      <Tooltip label="ONLY AVAILABLE ON 3x3 BOARD" hide={board.area === 9} />
      <Tooltip
        label="CLICK TO SEE THE BEST MOVE"
        hide={!activeRound || !isHumanTurn || board.area > 9}
      />
    </div>
  );
}
