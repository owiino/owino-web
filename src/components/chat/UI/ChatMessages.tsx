import React, { Fragment } from "react";

interface ChatMessagesProps {
  messages: any[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const messages = props.messages;
  //TODO: sort chat messages before mapping here
  return (
    <Fragment>
      <div className="w-full flex-1">
        {!messages[0] && (
          <div className="w-full h-full grid place-items-center">
            {/* some place holder here */}
            <span className="text-center">Your messages will appear here</span>
          </div>
        )}
        {messages[0] && (
          <div className="w-full h-full grid place-items-center">
            {/* Map if messages are present */}
            <span className="text-center">Your messages will appear here</span>
          </div>
        )}
      </div>
    </Fragment>
  );
};
