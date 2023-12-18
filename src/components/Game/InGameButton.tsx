import { useStore } from "@nanostores/react";
import type { MouseEvent, ChangeEvent } from "react";
import {
  moveStackStore,
  activeRoundStore,
  isHumanTurnStore,
  undidPrevMoveStore,
  setMoveStack,
  setUndidPrevMove,
} from "../../lib/state";
import undo from "../../assets/undo.svg";

export default function InGameButton({
  label,
  disabled,
  handleClick,
  iconStyle,
}: {
  label: string;
  disabled: boolean;
  handleClick: MouseEvent<HTMLButtonElement>;
  iconStyle?: object;
}) {
  const moveStack = useStore(moveStackStore);
  const activeRound = useStore(activeRoundStore);
  const isHumanTurn = useStore(isHumanTurnStore);
  const undidPrevMove = useStore(undidPrevMoveStore);

  return (
    <button
      className="flex flex-col items-center justify-center disabled:opacity-30 disabled:bg-transparent hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-[0_0_5px_1px_#afafaf] disabled:hover:shadow-none select-none"
      disabled={disabled}
      onClick={handleClick}
    >
      <img
        src={undo.src}
        alt="undo button"
        width="28px"
        height="28px"
        style={iconStyle}
        className="transition-all duration-300 ease-in-out"
      />
      <span style={{ fontFamily: "Jura" }} className="text-[10px]">
        {label}
      </span>
    </button>
  );
}
