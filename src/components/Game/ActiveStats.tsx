import { useStore } from "@nanostores/react";
import type { Stats } from "../../lib/types";
import { activeGameStore, statsStore } from "../../lib/state.ts";

type StatDisplayProps = {
  label: string;
  value: number | string;
  valueStyle?: string;
};
const StatDisplay = ({ label, value, valueStyle = "" }: StatDisplayProps) => {
  return (
    <div className="flex flex-col items-center gap-y-[6px] text-blue-900 select-none">
      <span style={{ fontFamily: "Jura" }} className="text-[11px]">
        {label}
      </span>
      <span style={{ fontFamily: "Nanum Brush Script" }} className={valueStyle}>
        {value}
      </span>
    </div>
  );
};

export default function ActiveStats() {
  const activeGame = useStore(activeGameStore);
  const stats = useStore(statsStore);
  return (
    <div
      className={`${
        activeGame ? "flex" : "hidden"
      } w-full justify-between py-4`}
    >
      <div className="flex pl-4">
        <StatDisplay
          label={`${stats.difficulty} mode`}
          value={`round ${stats.round}`}
          valueStyle="text-[1.5rem] -mt-2"
        />
      </div>
      <div className="flex gap-x-2 text-xs">
        <StatDisplay
          label="wins"
          value={stats.wins}
          valueStyle={`text-[1.75rem] ${stats.wins ? "text-blue-400" : ""}`}
        />
        <StatDisplay
          label="losses"
          value={stats.losses}
          valueStyle={`text-[1.75rem] ${stats.losses ? "text-rose-400" : ""}`}
        />
        <StatDisplay
          label="draws"
          value={stats.draws}
          valueStyle="text-[1.75rem]"
        />
      </div>
    </div>
  );
}
