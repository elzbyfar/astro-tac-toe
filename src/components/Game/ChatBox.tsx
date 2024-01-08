import { useStore } from "@nanostores/react";
import {
  isChatOpenStore,
  setIsChatOpen,
  chatInputStore,
  setChatInput,
  chatLogStore,
  setChatLog,
} from "../../lib/globalState";
import { useStyles } from "../../hooks";
import ghost from "../../assets/ghost.png";
import human from "../../assets/human.png";
import send from "../../assets/send.svg";
import open from "../../assets/open.svg";
import minimize from "../../assets/minimize.svg";

import type { ChatEntry } from "../../lib/types";

export default function ChatBox() {
  const isChatOpen = useStore(isChatOpenStore);
  const chatInput = useStore(chatInputStore);
  const chatLog = useStore(chatLogStore);

  const className = {
    chatBox:
      "w-96 bg-white border-[1px] overflow-hidden border-b-0 border-slate-400 rounded-[3px] rounded-b-none absolute bottom-0 right-10 transition-all duration-300 ease-in-out z-10",
    chatBoxExpanded: `${isChatOpen ? "h-[25rem]" : "h-8"}`,
  };

  const styles = useStyles(className);

  const handleScroll = () => {
    const chatLog = document.querySelector(".chat-log");
    if (chatLog) {
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  };

  const handleInputResize = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,

    incomingHeight?: number,
  ) => {
    const { scrollHeight, value } = e.target;
    const baseHeight = 40;
    let height = baseHeight;

    if (!value.length) {
      height = baseHeight;
    } else if (scrollHeight >= 64) {
      height = 64;
    }

    e.target.style.height = (incomingHeight ?? height) + "px";
  };

  const handleChatInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setChatInput(value);
    handleInputResize(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      handleInputResize(e, 40);
    }
  };

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const id = chatLog.at(-1)?.id;
    const chatEntry: ChatEntry = {
      id: id || 0 + 1,
      author: "human",
      timestamp: new Date().toLocaleTimeString(),
      content: chatInput,
    };
    setChatLog([...chatLog, chatEntry]);

    const input = document.querySelector(".text-area");
    if (input) {
      const input = document.querySelector(".text-area") as HTMLInputElement;
      input.style.height = "40px";
    }
    setChatInput("");
  };

  return (
    <div className={styles("chatBox")} onLoad={handleScroll}>
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="relative flex h-8 w-full px-2 items-center gap-x-1 border-b-[1px] border-b-slate-300 select-none hover:cursor-pointer"
      >
        <img
          src={ghost.src}
          alt="ghost-avatar"
          className="w-6 h-6 rounded-full "
        />
        <span className="text-[13px] font-semibold">Ghost in the Machine</span>
        <img
          src={isChatOpen ? minimize.src : open.src}
          alt={isChatOpen ? "minimize-icon" : "open-chat-icon"}
          className="w-6 absolute right-4 translate-y-[1px]"
        />
      </div>
      <div className="chat-log overflow-y-scroll h-auto max-h-[19rem] px-3 pt-2">
        {chatLog.map((message, mIndex) => (
          <div key={mIndex}>
            <div className="my-2">
              {message.author === "chat-gpt" ? (
                <div
                  style={{
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                  }}
                  className="relative bg-slate-300/60 p-2"
                >
                  <div className="grid grid-flow-col gap-2 items-center">
                    <div className="flex flex-col justify-center items-center bg-white rounded-full w-16 h-16 drop-shadow-lg">
                      <img
                        src={ghost.src}
                        alt="chat-gpt-avatar"
                        className="w-8 z-10"
                      />
                      <span className="font-bold text-[10px]">GHOST</span>
                    </div>
                    <div className="flex flex-col w-full">
                      <span className="text-sm pb-6">{message.content}</span>
                      <div className="absolute bottom-1 right-2 text-xs text-black/60 font-bold">
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    borderBottomRightRadius: "10px",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "10px",
                  }}
                  className="relative bg-blue-500 p-2 flex justify-end items-center"
                >
                  <div className="grid grid-cols-[16.75rem_4rem] gap-2 items-center">
                    <span className="text-sm pb-6 text-white">
                      {message.content}
                    </span>
                    <div className="flex flex-col justify-center items-center bg-white rounded-full w-16 h-16 drop-shadow-xl">
                      <img
                        src={human.src}
                        alt="human-avatar"
                        className="w-[2.25rem]"
                      />
                      <span className="font-bold text-[10px]">
                        {message.author.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-1 left-2 text-xs text-gray-100/60 font-bold">
                    <span>{message.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className={`flex items-center transition-all duration-200 w-full p-2 ${
          isChatOpen ? "absolute bottom-0" : "relative -mb-20"
        }`}
      >
        <textarea
          onChange={(e) => handleChatInputChange(e)}
          onKeyDown={handleKeyDown}
          value={chatInput}
          maxLength={140}
          placeholder="Trash talk your opponent..."
          className={`${
            chatInput.length ? "" : "h-10"
          } text-area transition-all duration-200 pl-2 pr-[38px] py-2 rounded-lg w-full border-[1px] border-gray-500 resize-none`}
        ></textarea>
        <button
          className="p-[6px] w-[30px] h-[30px] -ml-9 disabled:opacity-30 bg-blue-500 rounded-full"
          onClick={(e) => handleSubmit(e)}
          disabled={!chatInput.length}
        >
          <img src={send.src} alt="submit-button" className="ml-[1px]" />
        </button>
      </div>
    </div>
  );
}
