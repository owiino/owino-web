import React, { Fragment } from "react";
import { ChatLayout } from "../layouts/ChatLayout";
import { ShowChat } from "../UI/ShowChat";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";

interface ChatProps {
  socket: Socket;
}

export const Chat: React.FC<ChatProps> = (props) => {
  const showChatValue = useSelector((state: any) => state.chat.showChat);

  return (
    <Fragment>
      <div>
        {showChatValue && <ChatLayout socket={props.socket} />}
        {!showChatValue && <ShowChat />}
      </div>
    </Fragment>
  );
};
