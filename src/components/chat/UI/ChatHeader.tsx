import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

interface ChatHeaderProps {
  recipientImageUrl: string;
  recipientName: string;
  recipientRole: string;
  onChatClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = (props) => {
  return (
    <Fragment>
      <div className="bg-blue-400s flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-x-3">
          <div
            className="bg-gray-300 flex items-center justify-center 
                w-12 h-12 rounded-[50%] relative"
          >
            {/* {showImage && (
              <img
                src={props.recipientImageUrl}
                alt={props.recipientName}
                className="w-full  h-full rounded-[50%]"
              />
              )} */}
            {/* {!showImage && ( */}
            <svg className="w-7 h-7 fill-gray-dark-1">
              <use href={`${sprite}#icon-person-filled`}></use>
            </svg>
            {/* )} */}
            {/* TODO: To dynamically change the color od the dot depending 
              on users online status(active[fill-green-600], active-5min-ago[fill-yellow-600] 
              active-beyond-5min[fill-gray-500])  */}
            <svg className="w-6 h-6 fill-green-600 absolute -right-[9px] bottom-0">
              <use href={`${sprite}#icon-dot`}></use>
            </svg>
          </div>
          <div className="flex flex-col items-start justify-center gap-y-[-16px]">
            <span className="font-semibold text-lg">{props.recipientName}</span>
            <span className="text-gray-600">{props.recipientRole}</span>
          </div>
        </div>
        <div>
          <svg className="w-6 h-6 fill-gray-700" onClick={props.onChatClose}>
            <use href={`${sprite}#icon-cross-small`}></use>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};
