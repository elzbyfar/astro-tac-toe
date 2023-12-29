import { useStore } from "@nanostores/react";
import { activeGameStore, boardStore } from "../../lib/globalState.ts";
import { useStyles } from "../../hooks";
import Square from "./Square";

export default function Board() {
  const activeGame = useStore(activeGameStore);
  const board = useStore(boardStore);

  const squares = Array.from({ length: board.area }, (_, i) => i);

  const className = {
    container: `duration-300 transition-all overflow-hidden box-border w-60 flex flex-wrap`,
    containerMd: `md:w-[420px]`,
    containerVisibility: `${activeGame ? "h-60 my-8 md:h-[420px]" : "h-0"}`,
  };
  const styles = useStyles(className);

  return (
    <div className={styles("container")}>
      {squares.map((idx) => (
        <Square key={idx} index={idx} />
      ))}
    </div>
  );
}
