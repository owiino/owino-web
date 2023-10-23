import React, { Fragment, useRef, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { ChatFileLayout } from "../layouts/ChatFileLayout";

interface ChatFormProps {
  onSubmit: (message: string) => void;
}

export const ChatForm: React.FC<ChatFormProps> = (props) => {
  let messageRef = useRef<any>(null);
  const [showChatFileLayout, setShowFileLayout] = useState<boolean>(false);

  const onCloseChatFileHandler = (value: boolean) => {
    setShowFileLayout(value);
  };

  const onSubmitMessageHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const message: string = messageRef.current && messageRef.current?.value;
    if (!message) return;
    props.onSubmit(message);
    messageRef.current.value = messageRef.current && "";
  };

  return (
    <Fragment>
      <div className="relative w-full">
        <div className="relative bg-green-500s p-1 pt-3">
          <div className="flex items-center gap-x-2 absolute -top-3">
            <svg
              className="w-6 h-6 fill-gray-600 cursor-pointer"
              onClick={() => setShowFileLayout(() => true)}
            >
              <use href={`${sprite}#icon-attach-file`}></use>
            </svg>
            <svg className="w-6 h-6 fill-gray-600 cursor-pointer">
              <use href={`${sprite}#icon-gif`}></use>
            </svg>
            <svg className="w-6 h-6 fill-gray-600 cursor-pointer">
              <use href={`${sprite}#icon-emoji`}></use>
            </svg>
          </div>
        </div>
        {showChatFileLayout && (
          <ChatFileLayout onCloseChatFile={onCloseChatFileHandler} />
        )}
        <form
          onSubmit={(event) => onSubmitMessageHandler(event)}
          className="flex items-center justify-center bg-gray-300 
         w-full p-4 py-3 rounded-full"
        >
          <input
            type="text"
            required
            ref={messageRef}
            placeholder="Type message here"
            className="flex-1 outline-none bg-inherit placeholder:text-gray-600
            cursor-text-blue-500 min-w-[180px]"
            id="input-field"
          />
          <button type="submit">
            <svg className="w-6 h-6 fill-gray-600 hover:fill-primary transition-all">
              <use href={`${sprite}#icon-send`}></use>
            </svg>
          </button>
        </form>
      </div>
    </Fragment>
  );
};
