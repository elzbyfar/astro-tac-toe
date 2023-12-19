import { useStore } from "@nanostores/react";
import { activeGameStore, statsStore } from "../../lib/globalState.ts";
import { stylesReducer } from "../../lib/utils.ts";
import type { StatDisplayProps } from "../../lib/types.ts";

const StatDisplay = ({ label, value, valueStyle = "" }: StatDisplayProps) => {
  const className = {
    wrapper:
      "flex justify-center items-center gap-x-1 text-blue-900 select-none",
  };

  const styles = stylesReducer(className);

  return (
    <div className={styles("wrapper")}>
      <span style={{ fontFamily: "Jura" }} className="text-[11px]">
        {label}:
      </span>
      <span className={`text-xs ${valueStyle}`}>{value}</span>
    </div>
  );
};

export default function ActiveStats() {
  const activeGame = useStore(activeGameStore);
  const stats = useStore(statsStore);
  const className = {
    wrapper: "absolute grid grid-cols-3 bottom-0 w-full pb-2",
    wrapperMd: "md:px-32",
    wrapperVisibility: `${activeGame ? "flex" : "hidden"}`,
  };
  const styles = stylesReducer(className);
  return (
    <div className={styles("wrapper")}>
      <StatDisplay label="round" value={stats.round} />
      <StatDisplay label="mode" value={stats.difficulty} />
      <div className="flex gap-x-2 justify-center text-xs">
        <StatDisplay
          label="W"
          value={stats.wins}
          valueStyle={stats.wins ? "text-blue-400" : ""}
        />
        <StatDisplay
          label="L"
          value={stats.losses}
          valueStyle={stats.losses ? "text-rose-400" : ""}
        />
        <StatDisplay label="T" value={stats.draws} />
      </div>
    </div>
  );
}
