import { useStyles } from "../../hooks";

export default function Title() {
  const className = {
    container: "text-center cursor-default select-none pb-2",
    title:
      "tic-tac-toe text-2xl font-bold text-blue-900/80 flex gap-x-4 animate-pulse",
    titleMd: "md:text-[3.5rem]",
    subtitle:
      "relative flex -mt-[10px] ml-[26px] items-center justify-center font-extralight gap-x-1",
    subtitleMd: "",
    with: "text-[1rem] absolute -left-0 -rotate-12 text-blue-400/70",
    chatGPT: "text-[2.15rem] text-blue-400",
  };

  const styles = useStyles(className);
  return (
    <div className={styles("container")}>
      <h1 style={{ fontFamily: "bungee hairline" }} className={styles("title")}>
        <span className="leading-[3rem] tracking-[-12px]">Tic</span>
        <span className="leading-[3rem] tracking-[-12px]">Tac</span>
        <span className="leading-[3rem] tracking-[-12px]">Toe</span>
      </h1>
      <h1 style={{ fontFamily: "bungee" }} className={styles("subtitle")}>
        <span
          style={{ fontFamily: "Shadows Into Light" }}
          className={styles("with")}
        >
          with
        </span>
        <span className={styles("chatGPT")}>Chat GPT</span>
      </h1>
    </div>
  );
}
