import { useStore } from "@nanostores/react";
import { activeGameStore, statsStore, setStats } from "../../lib/state";
import { GAME_DIFFICULTIES } from "../../lib/constants";
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
  return (
    <div className={`${activeGame ? "hidden" : "flex"} w-full justify-center`}>
      <div className="flex w-8/12 h-20 justify-evenly items-center">
        <label
          style={{ fontFamily: "Jura" }}
          className="select-label select-none text-sm text-gray-500 cursor-default leading-10"
        >
          GAME MODE
          <select
            className="py-3 ml-2 px-1 uppercase"
            name="selectedDifficulty"
            value={stats.difficulty}
            onChange={(e) => handleChange(e)}
          >
            {GAME_DIFFICULTIES.map((difficulty: string, idx: number) => (
              <option key={idx} value={difficulty} className="select-option">
                {difficulty}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
