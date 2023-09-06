import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { showChat, hideChat } from "../../../store/actions/chat";

export const ShowChat: React.FC = () => {
  const showChatValue: boolean = useSelector(
    (state: any) => state.chat.showChat
  );
  const dispatch: any = useDispatch();

  const showChatHandler = () => {
    dispatch(showChat());
  };
  const hideChatHandler = () => {
    dispatch(hideChat());
  };

  return (
    <Fragment>
      <div
        className="grid place-items-center w-12 h-12 rounded-[50px]
            bg-primary fixed  bottom-[5vh] right-[5vh] shadow-2xl"
      >
        {!showChatValue && (
          <svg
            className="w-7 h-7 text-gray-100 cursor-pointer"
            onClick={() => showChatHandler()}
          >
            <use href={`${sprite}#icon-chat`}></use>
          </svg>
        )}
        {showChatValue && (
          <svg
            className="w-7 h-7 fill-gray-100 cursor-pointer"
            onClick={() => hideChatHandler()}
          >
            <use href={`${sprite}#icon-cross-small`}></use>
          </svg>
        )}
      </div>
    </Fragment>
  );
};
