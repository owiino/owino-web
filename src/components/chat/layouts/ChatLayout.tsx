import React, { Fragment } from "react";
import { Socket } from "socket.io-client";
import { ChatRecipientList } from "../UI/ChatRecipientList";
import { useSelector } from "react-redux";
import { ChatAggregator } from "./ChatAggregator";

interface ChatLayoutProps {
  socket: Socket;
}

export const ChatLayout: React.FC<ChatLayoutProps> = (props) => {
  const showChatValue: boolean = useSelector(
    (state: any) => state.chat.showChat
  );
  const showChatRecipientListValue = useSelector(
    (state: any) => state.chat.showChatRecipientList
  );

  return (
    <Fragment>
      <div
        className="w-[90%] sm:w-96s sm:w-[600px] h-[0vh] fixed bottom-[5vh] z-[500]
         right-[5%] md:right-[8%]s lg:right-[15%] flex items-end justify-center gap-x-2
         transition-all"
      >
        {showChatRecipientListValue && (
          <ChatRecipientList socket={props.socket} />
        )}
        {showChatValue && <ChatAggregator socket={props.socket} />}
      </div>
    </Fragment>
  );
};
