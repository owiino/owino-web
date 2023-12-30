import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const UserNotificationsList: React.FC = () => {
  // TODO: cater for all notification categories UI
  // notification categories include
  // product, chat, subscription, feedback, etc

  // Api call get notifications
  return (
    <Fragment>
      <div className="w-full">
        {/* ---- Item start ---- */}
        <div className="py-2 border-b-[1px] border-gray-200 space-y-2">
          <div className="w-full flex items-center gap-4">
            <span
              className="w-12 h-12 bg-gray-300 rounded-md
              grid place-items-center"
            >
              <svg
                className="w-6 h-6 fill-gray-700 cursor-pointer
               group-hover:fill-gray-400 font-light"
              >
                <use href={`${sprite}#icon-feedback`}></use>
              </svg>
            </span>
            <div className="flex flex-col items-start justify-center">
              <span>Feedback</span>
              <span className="text-sm">
                Hello, someone has given feedback about you
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">12h ago</span>
            <span className="text-sm text-gray-600">Dec 30, 2023</span>
          </div>
        </div>
        {/* ---- Item end ---- */}
        {/* ---- Item start ---- */}
        <div className="py-2 border-b-[1px] border-gray-200 space-y-2">
          <div className="w-full flex items-center gap-4">
            <span
              className="w-12 h-12 bg-gray-300 rounded-md
              grid place-items-center"
            >
              <svg
                className="w-5 h-5 fill-gray-700 cursor-pointer
               group-hover:fill-gray-400 font-light"
              >
                <use href={`${sprite}#icon-message-filled`}></use>
              </svg>
            </span>
            <div className="flex flex-col items-start justify-center">
              <span>Message</span>
              <span className="text-sm">
                You have a new message from someone
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">2d ago</span>
            <span className="text-sm text-gray-600">Dec 28, 2023</span>
          </div>
        </div>
        {/* ---- Item end ---- */}
        {/* ---- Item start ---- */}
        <div className="py-2 border-b-[1px] border-gray-200 space-y-2">
          <div className="w-full flex items-center gap-4">
            <span
              className="w-12 h-12 bg-gray-300 rounded-md
              grid place-items-center"
            >
              <svg
                className="w-6 h-6 fill-gray-700 cursor-pointer
               group-hover:fill-gray-400 font-light"
              >
                <use href={`${sprite}#icon-payment`}></use>
              </svg>
            </span>
            <div className="flex flex-col items-start justify-center">
              <span>Subscription</span>
              <span className="text-sm">
                Hey, you need a subscription to full use the chat
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">1w ago</span>
            <span className="text-sm text-gray-600">Dec 22, 2023</span>
          </div>
        </div>
        {/* ---- Item end ---- */}
      </div>
    </Fragment>
  );
};
