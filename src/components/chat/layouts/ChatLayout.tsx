import React, { Fragment, useState } from "react";
import { ChatHeader } from "../UI/ChatHeader";
import { ChatNotification } from "../UI/ChatNotification";
import { ChatForm } from "../UI/ChatForm";
import { ChatMessages } from "../UI/ChatMessages";

export const ChatLayout: React.FC = () => {
  // TODO: hook to constantly check internet connectivity
  // TODO: hook to auto-reconnection to the chatroom
  const [chatMessage, setChatMessage] = useState<string>("");

  const onSubmitHandler = (message: string) => {
    setChatMessage(message);
  };

  console.log("chatMessage", chatMessage);

  const notificationMessage =
    "Messages here are only viewed btn and seller. Not even owino can see the messages";

  return (
    <Fragment>
      <div
        className="fixed bottom-[5vh] right-[10%] w-96 h-[90vh]
         bg-gray-50 rounded-md shadow-2xl p-4 z-[500] border-[1px]
         border-gray-200 space-y-4 flex flex-col items-start 
          "
      >
        <ChatHeader
          recipientName={"Tibesigwa"}
          recipientRole={"Buyer"}
          recipientImageUrl={""}
          onChatClose={() => {}}
        />
        <ChatNotification message={notificationMessage} type={"default"} />
        <ChatMessages messages={[]} />
        <ChatForm onSubmit={onSubmitHandler} />
      </div>
    </Fragment>
  );
};
