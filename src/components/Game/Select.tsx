import { useStore } from "@nanostores/react";
import { activeGameStore } from "../../lib/globalState";
import { useStyles } from "../../hooks";
import type { ChangeEvent } from "react";
import type { SettingsMenuOption } from "../../lib/types";

type SelectProps = {
  label: string;
  value: number;
  menuOptions: SettingsMenuOption[];
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  label,
  value,
  menuOptions,
  handleChange,
}: SelectProps) {
  const activeGame = useStore(activeGameStore);

  const className = {
    container: "w-full justify-center",
    containerVisibility: `${activeGame ? "hidden" : "flex"}`,
    wrapper: "flex h-[56px] justify-evenly items-center",
    label:
      "select-label select-none text-sm text-gray-500 cursor-default leading-10 font-bold",
    select: "py-3 ml-2 px-1 uppercase font-normal",
    option: "select-option",
  };

  const styles = useStyles(className);

  return (
    <div className={styles("container")}>
      <div className={styles("wrapper")}>
        <label style={{ fontFamily: "Jura" }} className={styles("label")}>
          {label}
          <select
            className={styles("select")}
            name="select-menu"
            value={value}
            onChange={(e) => handleChange(e)}
          >
            {menuOptions.map((option: SettingsMenuOption) => (
              <option
                key={option.value}
                value={option.value}
                className={styles("option")}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
