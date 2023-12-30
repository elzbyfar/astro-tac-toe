import { useStore } from "@nanostores/react";
import { useStyles } from "../../hooks";
import {
  activeRoundStore,
  moveStackStore,
  isHumanTurnStore,
  undidPrevMoveStore,
  setMoveStack,
  setUndidPrevMove,
} from "../../lib/globalState";
import type { ReactMouseEvent } from "../../lib/types";
import undo from "../../assets/undo.svg";
import Tooltip from "./Tooltip";

export default function UndoButton() {
  const moveStack = useStore(moveStackStore);
  const activeRound = useStore(activeRoundStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const undidPrevMove = useStore(undidPrevMoveStore);

  function handleUndo(event: ReactMouseEvent) {
    event.preventDefault();
    if (moveStack.length === 0) return;
    const withoutAi = [...moveStack];
    withoutAi.pop();
    setMoveStack(withoutAi);
    setTimeout(() => {
      const withoutHuman = [...withoutAi];
      withoutHuman.pop();
      setMoveStack(withoutHuman);
    }, 500);
    setUndidPrevMove(true);
  }

  const className = {
    wrapper:
      "group relative pt-4 pb-8 flex flex-col items-center justify-center select-none",
    button:
      "group flex flex-col items-center justify-center mx-auto w-16 rounded-full",
    buttonDisabled: "disabled:opacity-30 disabled:bg-transparent",
    icon: "transition-all duration-300 ease-in-out w-5",
    iconMd: "md:w-7",
    text: "text-[10px] text-gray-500",
    singleUndoWarning:
      "absolute w-40 opacity-0 mt-4 text-[10px] bg-[#fb7171] text-white text-center transition-all duration-100 ease-in-out rounded-sm",
    singleUndoWarningVisibility: `${
      moveStack.length === 0 || !undidPrevMove ? "hidden" : ""
    }`,
    singleUndoWarningHoverLg: "lg:group-hover:opacity-100 lg:group-hover:mt-12",
    tooltip:
      "absolute overflow-hidden w-0 h-0 opacity-0 mt-4 text-[10px] bg-blue-900 text-white text-center transition-all duration-100 ease-in-out rounded-md",
    tooltipVisibility: `${
      moveStack.length === 0 || !activeRound || !isHumanTurn || undidPrevMove
        ? "hidden"
        : ""
    }`,
    tooltipHoverLg:
      "lg:group-hover:opacity-100 lg:group-hover:h-max lg:group-hover:w-max px-2 lg:group-hover:-mt-6",
  };

  const styles = useStyles(className);
  return (
    <div className={styles("wrapper")}>
      <button
        className={styles("button")}
        onClick={(e) => handleUndo(e)}
        disabled={
          moveStack.length === 0 ||
          !activeRound ||
          !isHumanTurn ||
          undidPrevMove
        }
      >
        <img src={undo.src} alt="undo button" className={styles("icon")} />
        <span style={{ fontFamily: "Jura" }} className={styles("text")}>
          UNDO
        </span>
      </button>
      <Tooltip
        label="CAN ONLY UNDO ONE MOVE PER TURN"
        hide={moveStack.length === 0 || !undidPrevMove}
      />
      <Tooltip
        label="CLICK TO REVERT LAST MOVE"
        hide={
          moveStack.length === 0 ||
          !activeRound ||
          !isHumanTurn ||
          undidPrevMove
        }
      />
    </div>
  );
}
