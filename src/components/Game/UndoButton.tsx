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

  return (
    <button
      className="flex flex-col items-center justify-center disabled:opacity-30 disabled:bg-transparent hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_5px_1px_#afafaf] disabled:hover:shadow-none select-none"
      disabled={
        moveStack.length === 0 || !activeRound || !isHumanTurn || undidPrevMove
      }
      onClick={(e) => handleUndo(e)}
    >
      <img
        src={undo.src}
        alt="undo button"
        width="28px"
        height="28px"
        className="transition-all duration-300 ease-in-out"
      />
      <span style={{ fontFamily: "Jura" }} className="text-[10px]">
        UNDO
      </span>
    </button>
  );
}
