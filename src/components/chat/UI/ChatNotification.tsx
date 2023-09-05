import React, { Fragment } from "react";

interface ChatNotificationProps {
  type: string;
  message: string;
}

export const ChatNotification: React.FC<ChatNotificationProps> = (props) => {
  const type = props.type;

  let bgColor: string;

  if (type === "success") {
    bgColor = "bg-green-200";
  } else if (type === "error") {
    bgColor = "bg-red-200";
  } else if (type === "info") {
    bgColor = "bg-blue-200";
  } else if (type === "warning") {
    bgColor = "bg-yellow-200";
  } else if (type === "default") {
    bgColor = "bg-gray-200";
  } else {
    bgColor = "bg-gray-200";
  }

  return (
    <Fragment>
      <div className={`${bgColor} p-2 text-center rounded-md w-full`}>
        <span>{props.message}</span>
      </div>
    </Fragment>
  );
};
