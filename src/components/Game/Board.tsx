import { useStore } from "@nanostores/react";
import { activeGameStore, sizeStore } from "../../lib/state.ts";
import Square from "./Square";

export default function Board() {
  const activeGame = useStore(activeGameStore);
  const size = useStore(sizeStore);

  const squares = Array.from({ length: size * size }, (_, i) => i);

  const className = {
    wrapper: `${
      activeGame ? "h-96" : "h-0"
    } duration-300 transition-all overflow-hidden box-border w-96 flex flex-wrap`,
  };

  return (
    <div className={className.wrapper}>
      {squares.map((idx) => (
        <Square key={idx} index={idx} />
      ))}
    </div>
  );
}
