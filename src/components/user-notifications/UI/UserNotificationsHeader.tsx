import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const UserNotificationsHeader: React.FC = () => {
  //TODO: api call to mark new notifications as read here
  return (
    <Fragment>
      <div className="full flex items-center justify-between gap-8">
        <span className="text-lg font-semibold">Notifications</span>
        {/* <div> */}
        <div
          className="flex items-center gap-2 hover:bg-gray-300 p-2 
          rounded cursor-pointer"
        >
          {/* TODO: to add a loader to replace icon while marking(api request) */}
          <svg
            className="w-5 h-5 fill-gray-600 cursor-pointer 
              group-hover:fill-gray-400 font-light"
          >
            <use href={`${sprite}#icon-check-circle`}></use>
          </svg>
          <span className="text-base font-normal">Mark all as read</span>
        </div>
        {/* </div> */}
      </div>
    </Fragment>
  );
};
