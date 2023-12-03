import React, { useState } from "react";
import type { ChangeEvent } from "react";
import SelectDifficulty from "./SelectDifficulty";
// import StartButton from "./StartButton.astro";
// import Title from "./Title.astro";
import { GAME_DIFFICULTIES } from "../../lib/constants";


export default function GameSettingCard() {

  const [gameDifficulty, setGameDifficulty] = useState('easy')
  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('clicking select')
    setGameDifficulty(event.target.value)
    // Update the metadata or perform any other logic here
  };

  console.log({gameDifficulty})
  return (
    <div className="w-96 h-60 bg-slate-50 z-10 py-4 flex flex-col rounded-xl justify-evenly items-center opacity-100 shadow-[0_0_20px_8px_#afafaf]">
      <div className="text-center">
        <h1 style={{ fontFamily: "bungee"}} className="tic-tac-toe text-4xl font-bold text-blue-400">Tic Tac Toe</h1>
        <span className="flex font-extralight justify-end align-super text-[11px] -mt-1 pr-[2px] text-blue-900">by Luis Alejo</span>
      </div>
      <div className="flex w-8/12 h-20 justify-evenly items-center">
    <label className="select-label text-sm text-gray-500 cursor-default leading-10">
    GAME MODE
    
    <select className="py-3 px-1 uppercase" name="selectedDifficulty" value={gameDifficulty} onChange={handleDifficultyChange}>
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
      <div className="group flex box-border justify-center">
        <button onClick={() => console.log('we see action')} className="relative flex items-center tracking-wider text-base h-full z-10 transition duration-300 ease-in-out rounded-md focus:ring-2 focus:outline-none focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-white">
          <span className="relative text-blue-900 font-extralight tracking-widest border-b-2 border-transparent ease-in-out duration-300 group-hover:text-blue-400 group-hover:tracking-wide group-hover:font-bold group-hover:z-10">
            START
            <div className="bg-blue-400 h-1 w-0 group-hover:w-full ease-in-out duration-700">
            </div>
          </span>
        </button>
      </div>
    </div>
  )
};
