import React, { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { Messages } from "../../../utils/index.ts";
import { TUser } from "../../../types/auth.ts";
import { useSelector } from "react-redux";
import { IChatMessage, IOrganizedChatMessage } from "../../../types/chat.ts";
import { MessageDay } from "./MessageDay.tsx";
import { MessagePlaceholder } from "./MessagePlaceholder.tsx";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const messages = new Messages(currentUser, recipient).organize(
    props.messages
  );

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
        {!messages[0] && <MessagePlaceholder />}
        {messages[0] && (
          <div
            className="overflow-x-hidden w-full h-[50vh] relative"
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
