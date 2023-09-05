import React, { Fragment, useRef } from "react";
import sprite from "../../../assets/icons/sprite.svg";

interface ChatFormProps {
  onSubmit: (message: string) => void;
}

export const ChatForm: React.FC<ChatFormProps> = (props) => {
  const messageRef = useRef<any>(null);

  const onSubmitMessageHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const message: string = messageRef.current && messageRef.current?.value;
    if (!message) return;
    props.onSubmit(message);
    // messageRef.current = "";
  };

  return (
    <Fragment>
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
          className="flex-1 outline-none bg-inherit"
        />
        <button type="submit">
          <svg className="w-6 h-6 fill-gray-700">
            <use href={`${sprite}#icon-cross-small`}></use>
          </svg>
        </button>
      </form>
    </Fragment>
  );
};
