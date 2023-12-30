import { useStore } from "@nanostores/react";
import { activeGameStore, boardStore } from "../../lib/globalState";

export default function Instructions() {
  const activeGame = useStore(activeGameStore);
  const board = useStore(boardStore);
  if (activeGame && board.area > 9) {
    return (
      <span className="text-[11px] tracking-wider text-gray-400/70 select-none">
        CONNECT{" "}
        <span className="font-bold text-gray-500/80 text-[15px]">
          {board.connectToWin}
        </span>{" "}
        TO WIN
      </span>
    );
  }

  return null;
}
