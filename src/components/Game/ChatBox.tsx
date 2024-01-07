import { useStore } from "@nanostores/react";
import { isChatOpenStore, setIsChatOpen } from "../../lib/globalState";
import { useStyles } from "../../hooks";
import ghost from "../../assets/ghost.png";
import human from "../../assets/human.png";
import { MOCK_CHAT } from "../../lib/constants";

export default function ChatBox() {
  const isChatOpen = useStore(isChatOpenStore);

  const className = {
    chatBox:
      "w-96 bg-white border-[1px] border-b-0 border-slate-400 rounded-[3px] rounded-b-none absolute bottom-0 right-10 transition-all duration-300 ease-in-out z-10",
    chatBoxExpanded: `${isChatOpen ? "h-[25rem]" : "h-8"}`,
  };

  const styles = useStyles(className);

  return (
    <div className={styles("chatBox")}>
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="flex h-8 w-full px-2 items-center gap-x-1 border-b-[1px] border-b-slate-300 select-none"
      >
        <img
          src={ghost.src}
          alt="ghost-avatar"
          className="w-6 h-6 rounded-full "
        />
        <span className="text-[13px] font-semibold">Ghost in the Machine</span>
      </div>
      <div className="overflow-y-scroll h-80 px-3 pt-2">
        {MOCK_CHAT.map((message) => (
          <div>
            <div className="my-2">
              {message.author === "ghost" ? (
                <div
                  style={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderTopLeftRadius: "50px",
                    borderBottomLeftRadius: "50px",
                  }}
                  className="relative bg-slate-300/60 p-2"
                >
                  <div className="grid grid-flow-col gap-2 items-center">
                    <div className="flex justify-center items-center bg-white rounded-full w-20 h-20 drop-shadow-lg">
                      <img
                        src={ghost.src}
                        alt="chat-gpt-avatar"
                        className="w-12 z-10"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm pb-6">{message.content}</span>
                      <div className="absolute bottom-1 right-2 text-xs">
                        <span>{message.timestamp}</span>
                        <span className="px-1">•</span>
                        <span className="font-bold">
                          {message.author.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    borderTopRightRadius: "50px",
                    borderBottomRightRadius: "50px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                  className="relative bg-blue-300 p-2 flex justify-end items-center"
                >
                  <div className="grid grid-cols-[15.75rem_5rem] gap-2 items-center">
                    <span className="text-sm pb-6">{message.content}</span>
                    <div className="flex justify-center items-center bg-white rounded-full w-20 h-20 drop-shadow-lg">
                      <img
                        src={human.src}
                        alt="human-avatar"
                        className="w-[3.25rem]"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-1 left-2 text-xs">
                    <span className="font-bold">
                      {message.author.toUpperCase()}
                    </span>
                    <span className="px-1">•</span>
                    <span>{message.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-2">
        <input className="px-2 py-1 rounded-full w-full border-[1px] border-gray-500" />
      </div>
    </div>
  );
}
