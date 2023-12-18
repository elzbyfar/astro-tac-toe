import { useStore } from "@nanostores/react";
import { activeGameStore, statsStore, setStats } from "../../lib/state";
import { GAME_DIFFICULTIES } from "../../lib/constants";
import { stylesReducer } from "../../lib/utils";
import type { ChangeEvent } from "react";

export default function SelectDifficulty() {
  const stats = useStore(statsStore);
  const activeGame = useStore(activeGameStore);
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setStats({
      ...stats,
      difficulty: event.target.value,
    });
  }

  const className = {
    container: "w-full justify-center",
    containerVisibility: `${activeGame ? "hidden" : "flex"}`,
    wrapper: "flex h-20 justify-evenly items-center",
    label:
      "select-label select-none text-sm text-gray-500 cursor-default leading-10",
    select: "py-3 ml-2 px-1 uppercase",
    option: "select-option",
  };

  const styles = stylesReducer(className);
  return (
    <div className={styles("container")}>
      <div className={styles("wrapper")}>
        <label style={{ fontFamily: "Jura" }} className={styles("label")}>
          GAME MODE
          <select
            className={styles("select")}
            name="selectedDifficulty"
            value={stats.difficulty}
            onChange={(e) => handleChange(e)}
          >
            {GAME_DIFFICULTIES.map((difficulty: string, idx: number) => (
              <option key={idx} value={difficulty} className={styles("option")}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
