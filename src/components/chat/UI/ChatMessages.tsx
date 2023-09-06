import React, { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { Messages } from "../../../utils/index.ts";
import { TUser } from "../../../types/auth.ts";
import { useSelector } from "react-redux";
import { IChatMessage, IOrganizedChatMessage } from "../../../types/chat.ts";
import { MessageDay } from "./MessageDay.tsx";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const currentUser: TUser = useSelector((state: any) => state.auth.user);

  console.log(props); //To be removed

  const recipient: TUser = {
    userId: 6,
    firstName: "Muhumuza",
    imageUrl: null,
    lastName: "Nicholas",
    phoneNumber: "256754108280",
    role: "buyer",
    createdAt: "2023-09-02T15:29:13.532Z",
    updatedAt: "2023-09-02T15:29:13.532Z",
  };

  const messageList = [
    {
      messageId: 1,
      chatRoomId: "chatroomIdOne",
      senderId: 5,
      recipientId: 6,
      message: "Hello brother Nicholas",
      isRead: false,
      isDelivered: false,
      createdAt: "2023-09-06T01:51:45.278Z",
    },
    {
      messageId: 2,
      chatRoomId: "chatroomIdOne",
      senderId: 5,
      recipientId: 6,
      message: "How are you doing",
      isRead: false,
      isDelivered: false,
      createdAt: "2023-09-06T01:51:55.287Z",
    },
    {
      messageId: 3,
      chatRoomId: "chatroomIdOne",
      senderId: 5,
      recipientId: 6,
      message: "How looking for to hearing from you",
      isRead: false,
      isDelivered: false,
      createdAt: "2023-09-06T01:52:35.288Z",
    },
    {
      messageId: 4,
      chatRoomId: "chatroomIdOne",
      senderId: 6,
      recipientId: 5,
      message: "Hey Dankan long time",
      isRead: false,
      isDelivered: false,
      createdAt: "2023-09-06T01:53:45.288Z",
    },
    {
      messageId: 5,
      chatRoomId: "chatroomIdOne",
      senderId: 6,
      recipientId: 5,
      message: "am fine and you",
      isRead: false,
      isDelivered: false,
      createdAt: "2023-09-06T02:01:45.288Z",
    },
    {
      messageId: 6,
      chatRoomId: "chatroomIdOne",
      senderId: 5,
      recipientId: 6,
      message: "Am fine but very busy bro, like very busy",
      isRead: false,
      isDelivered: false,
      createdAt: "2023-09-06T05:51:45.288Z",
    },
  ];

  const messages = new Messages(currentUser, recipient).organize(
    // props.messages
    messageList
  );

  console.log("Organized messages", messages);

  const isPrimaryButNotFirstMessage = (
    message: IOrganizedChatMessage,
    index: number
  ): boolean => {
    if (message.isPrimaryMessage && index !== 0) return true;
    return false;
  };

  return (
    <Fragment>
      <div className="w-full flex-1">
        {!messages[0] && (
          <div className="w-full h-full grid place-items-center">
            <span className="text-center">Your messages will appear here</span>
          </div>
        )}
        {messages[0] && (
          <div
            className="h-[55vh] overflow-x-hidden relative"
            id="message-container"
          >
            {messages.map((message, index) => {
              return (
                <div
                  key={index + 1}
                  className={`${
                    isPrimaryButNotFirstMessage(message, index) && "mt-4"
                  }`}
                >
                  {message.showDay && (
                    <MessageDay createdAt={message.createdAt} />
                  )}
                  {message.isPrimaryMessage && <MessagePrimary msg={message} />}
                  {!message.isPrimaryMessage && (
                    <MessageSecondary msg={message} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};
