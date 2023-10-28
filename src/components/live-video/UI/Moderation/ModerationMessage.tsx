import React, { Fragment } from "react";
import sprite from "../../../../assets/icons/sprite.svg";

interface ModerationMessageProps {}

export const ModerationMessage: React.FC<ModerationMessageProps> = (props) => {
  console.log(props);
  return (
    <Fragment>
      <div>
        <div
          className="space-x-2 flex items-center justify-start
            text-sm"
        >
          <span
            className="bg-gray-300 flex items-center justify-center 
             w-8 h-8 rounded-[50%]"
          >
            <svg className="w-5 h-5 fill-gray-dark-1">
              <use href={`${sprite}#icon-person-filled`}></use>
            </svg>
          </span>
          <span>{"You"}</span>
          <span className="text-[12px] text-gray-500">{"8:27 PM"}</span>
        </div>
        <div>
          <span className="text-sm ml-4">{"How is every one doing "}</span>
        </div>
      </div>
    </Fragment>
  );
};
