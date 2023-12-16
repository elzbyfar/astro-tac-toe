export default function Title() {
  return (
    <div className="text-center cursor-default select-none">
      <h1
        style={{ fontFamily: "bungee" }}
        className="tic-tac-toe text-4xl font-bold text-blue-400 flex gap-x-4"
      >
        <span>Tic</span>
        <span>Tac</span>
        <span>Toe</span>
      </h1>
      <div
        style={{ fontFamily: "Shadows Into Light" }}
        className="flex -mt-[6px] items-end justify-end font-extralight text-blue-900/50 gap-x-1"
      >
        <span className="flex justify-end text-[12px]">by</span>
        <span className="text-[1rem]">Luis</span>
        <span className="text-[1rem]">Alejo</span>
      </div>
    </div>
  );
}
