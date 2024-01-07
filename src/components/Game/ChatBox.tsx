import { useStore } from "@nanostores/react";
import { isChatOpenStore, setIsChatOpen } from "../../lib/globalState";
import { useStyles } from "../../hooks";
import robot from "../../assets/robot.png";
import { MOCK_CHAT } from "../../lib/constants";

export default function ChatBox() {
  const isChatOpen = useStore(isChatOpenStore);

  const className = {
    chatBox:
      "w-60 bg-white border-[1px] border-b-0 border-slate-400 rounded-[3px] rounded-b-none absolute bottom-0 right-10 transition-all duration-300 ease-in-out z-10",
    chatBoxExpanded: `${isChatOpen ? "h-60" : "h-8"}`,
  };

  const styles = useStyles(className);

  return (
    <div
      className={styles("chatBox")}
      onClick={() => setIsChatOpen(!isChatOpen)}
    >
      <div className="flex h-8 w-full px-2 items-center gap-x-1 border-b-[1px] border-b-slate-300 select-none">
        <img
          src={robot.src}
          alt="robot-avatar"
          className="w-6 h-6 rounded-full "
        />
        <span className="text-[13px] font-semibold">Ghost in the Machine</span>
      </div>
      {MOCK_CHAT.map((message) => (
        <div>
          <span>{message.author}</span>
          <span>{message.timestamp}</span>
          <span>{message.content}</span>
        </div>
      ))}
    </div>
  );
}
