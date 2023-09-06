import React, { Fragment } from "react";
import { MessagePrimary } from "./MessagePrimary";
import { MessageSecondary } from "./MessageSecondary";
import { Messages } from "../../../utils.ts";
import { AppDate } from "../../../utils.ts";
import { TUser } from "../../../types/auth.ts";
import { useSelector } from "react-redux";
import { IChatMessage } from "../../../types/chat.ts";

interface ChatMessagesProps {
  messages: IChatMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const day = (date: string) => new AppDate(date).day();
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  let recipient: any;

  const messages = new Messages(currentUser, recipient).organize(
    props.messages
  );

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
            className="p-4 pt-8 h-[55vh] overflow-x-hidden relative"
            id="message-container"
          >
            {messages.map((message, index) => {
              return (
                <div key={index + 1}>
                  {message.showDay && (
                    <p className="flex items-center justify-between mb-3">
                      <span className="h-[1px] grow bg-gray-light-4"></span>
                      <span className="bg-gray-300 px-2 py-1 rounded-md mx-2 text-gray-700">
                        {day(message.createdAt)}
                      </span>
                      <span className="h-[1px] grow bg-gray-light-4"></span>
                    </p>
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
