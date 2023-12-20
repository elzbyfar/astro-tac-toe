import { useStore } from "@nanostores/react";
import { activeGameStore, statsStore } from "../../lib/globalState.ts";
import { useStyles } from "../../hooks";
import type { StatDisplayProps } from "../../lib/types.ts";

const StatDisplay = ({ label, value, valueStyle = "" }: StatDisplayProps) => {
  const className = {
    wrapper:
      "flex justify-center gap-x-[2px] text-blue-900 select-none text-[11px]",
    value: ` font-semibold ${valueStyle}`,
  };

  const styles = useStyles(className);

  return (
    <div className={styles("wrapper")}>
      <span style={{ fontFamily: "Jura" }}>{label}:</span>
      <span className={styles("value")}>{value}</span>
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
    winsAndLosses: "flex gap-x-2 justify-center text-xs",
  };
  const styles = useStyles(className);

  return (
    <div className={styles("wrapper")}>
      <StatDisplay label="round" value={stats.round} />
      <StatDisplay label="mode" value={stats.difficulty} />
      <div className={styles("winsAndLosses")}>
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
