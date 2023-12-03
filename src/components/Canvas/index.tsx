import { useState} from "react";
import type { MouseEvent, ChangeEvent } from "react";
import SelectDifficulty from "./SelectDifficulty";
import StartButton from "./StartButton"
import Title from "./Title";

export default function Canvas() {
  const [difficulty, setDifficulty] = useState('easy')
  const [activeGame, setActiveGame] = useState(false)
  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value)
  };
  const handleGameStart = (event: MouseEvent<HTMLButtonElement>) => {
    setActiveGame(true)
  }

  const className = {
    inactive: "w-96 transition-all duration-300 bg-slate-50 z-10 py-4 flex flex-col rounded-xl justify-evenly items-center opacity-100 shadow-[0_0_20px_8px_#afafaf]",
    // active: "w-96 h-[450px] bg-slate-50 z-10 py-4 flex flex-col rounded-xl justify-evenly items-center opacity-100 shadow-[0_0_20px_8px_#afafaf]"
  }

  return (
    <div className={className.inactive}>
      <Title />
      <SelectDifficulty gameDifficulty={difficulty} setGameDifficulty={handleDifficultyChange} />
      <div className={`${activeGame? "h-[400px]" : "h-10"} duration-300 transition-all`}></div>
      <StartButton setStart={handleGameStart} />
    </div>
  )
};
