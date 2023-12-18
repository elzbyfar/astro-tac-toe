import { useStore } from "@nanostores/react";
import { activeGameStore, sizeStore } from "../../lib/globalState.ts";
import { stylesReducer } from "../../lib/utils.ts";
import Square from "./Square";

export default function Board() {
  const activeGame = useStore(activeGameStore);
  const size = useStore(sizeStore);

  const squares = Array.from({ length: size * size }, (_, i) => i);

  const className = {
    container: `duration-300 transition-all overflow-hidden box-border w-60 flex flex-wrap`,
    containerMd: `md:w-96`,
    containerVisibility: `${activeGame ? "h-60" : "h-0"}`,
    containerVisibilityMd: `${activeGame ? "md:h-96" : "h-0"}`,
  };
  const styles = stylesReducer(className);

  return (
    <div className={styles("container")}>
      {squares.map((idx) => (
        <Square key={idx} index={idx} />
      ))}
    </div>
  );
}
