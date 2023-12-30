import { useStyles } from "../../hooks";

export default function Tooltip({
  label,
  hide,
}: {
  label: string;
  hide: boolean;
}) {
  const className = {
    tooltip:
      "w-0 h-0 opacity-0 text-[10px] shadow-[0_1px_0px_#777777] bg-white text-black text-center transition-all duration-100 ease-in-out rounded-md overflow-hidden",
    tooltipVisibility: `${hide ? "hidden" : ""}`,
    tooltipHoverLg:
      "lg:group-hover:opacity-100 lg:group-hover:-mt-20 lg:group-hover:h-max lg:group-hover:w-max lg:group-hover:px-2",
    triangle:
      " w-0 h-0 opacity-0 transition-all duration-100 ease-in-out border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent border-t-[6px] border-t-white drop-shadow-[0_1px_0px_#777777]",
    triangleVisibility: `${hide ? "hidden" : ""}`,
    triangleHoverLg: "lg:group-hover:opacity-100 lg:group-hover:-mt-[1px]",
  };

  const styles = useStyles(className);

  return (
    <div className="absolute flex flex-col items-center justify-center">
      <span style={{ fontFamily: "Jura" }} className={styles("tooltip")}>
        {label}
      </span>
      <div className={styles("triangle")}></div>
    </div>
  );
}
