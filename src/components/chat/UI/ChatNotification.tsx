import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

interface ChatNotificationProps {
  type: string;
  message: string;
  onShow: (close: boolean) => void;
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

  const notificationCloseHandler = () => {
    props.onShow(false);
  };

  return (
    <Fragment>
      <div
        className={`${bgColor} relative p-2 pr-4 text-center rounded-md w-full`}
      >
        <span className="text-sm">{props.message}</span>
        <span>
          <svg
            className="w-4 h-4 fill-gray-dark-2 absolute right-1 top-1
            cursor-pointer"
            onClick={() => notificationCloseHandler()}
          >
            <use href={`${sprite}#icon-cross-small`}></use>
          </svg>
        </span>
      </div>
    </Fragment>
  );
};
