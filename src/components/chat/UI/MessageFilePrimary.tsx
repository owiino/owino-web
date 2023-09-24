import React, { Fragment } from "react";
import { IOrganizedChatMessage } from "../../../types/chat.ts";
import sprite from "../../../assets/icons/sprite.svg";
import { AppDate } from "../../../utils/index.ts";

interface MessageFileProps {
  msg: IOrganizedChatMessage;
}

export const MessageFilePrimary: React.FC<MessageFileProps> = (props) => {
  const chatFile = props.msg.ChatFile;
  if (!chatFile) return;

  const time = () => new AppDate(msg.createdAt).time();
  const msg = props.msg;
  const fileType = props.msg.ChatFile?.file.type;
  const fileUrl = props.msg.ChatFile?.file.url;
  const caption = msg.message === "FILE" ? "" : msg.message;

  return (
    <Fragment>
      <div className="flex items-start gap-x-3">
        <div
          className="bg-gray-light-3 flex items-center justify-center 
           w-10 h-10 rounded-[50%] relative"
        >
          {msg.userImageUrl && (
            <img
              src={msg.userImageUrl}
              alt={msg.username}
              className="w-full  h-full rounded-[50%]"
            />
          )}
          {!msg.userImageUrl && (
            <svg className="w-6 h-6 fill-gray-600">
              <use href={`${sprite}#icon-person-filled`}></use>
            </svg>
          )}
        </div>

        <div className="flex-1 mr-2 space-y-2">
          <div className="flex items-center gap-x-1">
            <span className="text-gray-700">{msg.username}</span>
            <svg className="w-3 h-3 fill-gray-500">
              <use href={`${sprite}#icon-dot`}></use>
            </svg>
            <span className="text-sm text-gray-500">{time()}</span>
          </div>
          <div
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-light-2 before:bg-primary"
                : "bg-gray-light-3 text-gray-900 before:bg-gray-light-3"
            }
           p-2 pt-4 rounded-xl 
           rounded-tl-none relative before:absolute before:top-[-1px] before:left-[-2px] 
           before:h-4 before:w-4  before:skew-y-[32deg] before:z-20
           before:rotate-[-32deg] w-auto max-w-full min-h-8 z-30`}
          >
            {fileType === "image" && (
              <div className="w-full h-auto ">
                <img
                  src={fileUrl}
                  alt="FILE"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
            {/* video file here */}
            {/* Other file types here */}
            <div
              className="relative flex items-start justify-between py-2
                gap-x-2"
            >
              <span className="text-start text-sm">{caption}</span>
              <a
                href={fileUrl}
                className="bg-gray-100 p-1 grid place-items-center rounded-[50%]
                 border-[1px] borders-gray-600 shadow-lg"
              >
                <svg className="w-4 h-4 fill-gray-600 cursor-pointer">
                  <use href={`${sprite}#icon-download`}></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
