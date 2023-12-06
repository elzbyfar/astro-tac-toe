import { GAME_DIFFICULTIES } from "../../lib/constants";

export default function SelectDifficulty({
  gameDifficulty,
  setGameDifficulty,
}: {
  gameDifficulty: string;
  setGameDifficulty: Function;
}) {
  return (
    <div className="flex w-8/12 h-20 justify-evenly items-center">
      <label className="select-label text-sm text-gray-500 cursor-default leading-10">
        GAME MODE
        <select
          className="py-3 ml-2 px-1 uppercase"
          name="selectedDifficulty"
          value={gameDifficulty}
          onChange={(e) => setGameDifficulty(e)}
        >
          {GAME_DIFFICULTIES.map((difficulty: string, idx: number) => (
            <option key={idx} value={difficulty} className="select-option">
              {difficulty}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
