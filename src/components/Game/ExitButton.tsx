import { useStore } from "@nanostores/react";
import { activeGameStore, setActiveGame } from "../../lib/state";
export default function ExitButton() {
  const activeGame = useStore(activeGameStore);

  function handleExit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setActiveGame(false);
  }
  return (
    <button
      className={`${activeGame ? "flex" : "hidden"}`}
      onClick={handleExit}
    >
      END GAME
    </button>
  );
}
