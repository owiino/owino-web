import React, { Fragment } from "react";
import { ChatLayout } from "../layouts/ChatLayout";
import { ShowChat } from "../UI/ShowChat";
import { useSelector } from "react-redux";

export const Chat: React.FC = () => {
  const showChatValue = useSelector((state: any) => state.chat.showChat);

  return (
    <Fragment>
      <div>
        {showChatValue && <ChatLayout />}
        <ShowChat />
      </div>
    </Fragment>
  );
};
