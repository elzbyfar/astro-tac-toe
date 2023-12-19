import { useStore } from "@nanostores/react";
import {
  activeRoundStore,
  moveStackStore,
  isHumanTurnStore,
  undidPrevMoveStore,
  setMoveStack,
  setUndidPrevMove,
} from "../../lib/globalState";
import undo from "../../assets/undo.svg";
import { stylesReducer } from "../../lib/utils";

export default function UndoButton() {
  const moveStack = useStore(moveStackStore);
  const activeRound = useStore(activeRoundStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const undidPrevMove = useStore(undidPrevMoveStore);

  function handleUndo(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
    button:
      "flex flex-col items-center py-2 w-16 mx-auto rounded-full transition-all duration-300 ease-in-out select-none",
    buttonDisabled:
      "disabled:opacity-30 disabled:bg-transparent disabled:hover:shadow-none ",
    buttonHoverLg: "lg:hover:shadow-[0_0_5px_1px_#afafaf] hover:bg-blue-200",
    icon: "transition-all duration-300 ease-in-out w-5",
    iconMd: "md:w-7",
    text: "text-[10px] text-gray-500",
  };

  const styles = stylesReducer(className);
  return (
    <button
      className={styles("button")}
      onClick={(e) => handleUndo(e)}
      disabled={
        moveStack.length === 0 || !activeRound || !isHumanTurn || undidPrevMove
      }
    >
      <img src={undo.src} alt="undo button" className={styles("icon")} />
      <span style={{ fontFamily: "Jura" }} className={styles("text")}>
        UNDO
      </span>
    </button>
  );
}
