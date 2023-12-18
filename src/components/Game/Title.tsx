import { stylesReducer } from "../../lib/utils";

export default function Title() {
  const className = {
    container: "text-center cursor-default select-none",
    title: "tic-tac-toe text-2xl font-bold text-blue-400 flex gap-x-2",
    titleMd: "md:text-4xl md:gap-x-4",
    subtitle:
      "flex -mt-[6px] items-end justify-end font-extralight text-blue-900/50 gap-x-1",
    by: "text-[10px]",
    byMd: "md:text-[12px]",
    name: "text-[14px]",
    nameMd: "md:text-[1rem]",
  };

  const styles = stylesReducer(className);
  return (
    <div className={styles("container")}>
      <h1 style={{ fontFamily: "bungee" }} className={styles("title")}>
        <span>Tic</span>
        <span>Tac</span>
        <span>Toe</span>
      </h1>
      <div
        style={{ fontFamily: "Shadows Into Light" }}
        className={styles("subtitle")}
      >
        <span className={styles("by")}>by</span>
        <span className={styles("name")}>Luis</span>
        <span className={styles("name")}>Alejo</span>
      </div>
    </div>
  );
}
