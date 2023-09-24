import React, { Fragment } from "react";
import { IOrganizedChatMessage } from "../../../types/chat.ts";
import sprite from "../../../assets/icons/sprite.svg";

interface MessageFileProps {
  msg: IOrganizedChatMessage;
}

export const MessageFileSecondary: React.FC<MessageFileProps> = (props) => {
  const chatFile = props.msg.ChatFile;
  if (!chatFile) return;

  const msg = props.msg;
  const fileType = props.msg.ChatFile?.file.type;
  const fileUrl = props.msg.ChatFile?.file.url;
  const caption = msg.message === "FILE" ? "" : msg.message;

  return (
    <Fragment>
      <div>
        <div className="flex-1 mr-2 mt-1 ml-12 space-y-2">
          <div
            className={`text-sm ${
              msg.currentUserIsSender
                ? "bg-primary text-gray-light-2 before:bg-primary"
                : "bg-gray-light-3 text-gray-900 before:bg-gray-light-3"
            }
            p-2 pt-4 rounded-xl  w-auto max-w-full min-h-8 z-30`}
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
