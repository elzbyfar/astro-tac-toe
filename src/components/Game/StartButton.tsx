import { useStore } from "@nanostores/react";
import {
  activeGameStore,
  setActiveGame,
  setActiveRound,
} from "../../lib/globalState.ts";

import { stylesReducer } from "../../lib/utils.ts";

export default function StartButton() {
  const activeGame = useStore(activeGameStore);

  type ReactMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

  function handleStart(event: ReactMouseEvent) {
    event.preventDefault();
    setActiveGame(true);
    setActiveRound(true);
  }

  const className = {
    wrapper: "group box-border justify-center select-none",
    wrapperVisibility: `${activeGame ? "hidden" : "flex"}`,
    button: `relative flex items-center tracking-widest py-1 text-base h-full z-10 duration-100 ease-in-out text-blue-900 font-extralight`,
    buttonHoverLg: "lg:group-hover:text-blue-400",
    text: "relative border-b-2 border-transparent ease-in-out group-hover:z-10",
    underlineLg: "lg:bg-blue-400 lg:h-1 lg:w-0 lg:ease-in-out lg:duration-300",
    underlineHoverLg: "lg:group-hover:w-full",
  };

  const styles = stylesReducer(className);

  return (
    <div className={styles("wrapper")}>
      <button onClick={(e) => handleStart(e)} className={styles("button")}>
        <span style={{ fontFamily: "Jura" }} className={styles("text")}>
          START
          <div className={styles("underline")}></div>
        </span>
      </button>
    </div>
  );
}