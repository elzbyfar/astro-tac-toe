import React, { useContext } from "react"
import type { ChangeEvent } from "react";
import { GAME_DIFFICULTIES } from "../../lib/constants";
import GameStateContext from "../../context/GameStateContext";

export default function SelectDifficulty() {

  const { metadata, setMetadata } = useContext(GameStateContext);
  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('clicking select')
    // Update the metadata or perform any other logic here
  };

  console.log({metadata})
  return (
  <div className="flex w-8/12 h-20 justify-evenly items-center">
    <label className="select-label text-sm text-gray-500 cursor-default leading-10">
    GAME MODE
    
    <select className="py-3 px-1 uppercase" name="selectedDifficulty" defaultValue="easy" value={metadata.difficulty} onChange={handleDifficultyChange}>
      {
        GAME_DIFFICULTIES.map((difficulty: string, idx: number) => (
          <option key={idx} value={difficulty} className="select-option">
            {difficulty}
          </option>
        ))
      }
    </select>
    </label>
  </div>
  )
}

