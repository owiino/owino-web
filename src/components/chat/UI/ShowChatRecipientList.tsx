import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  showChatRecipientList,
  hideChatRecipientList,
  hideChat,
} from "../../../store/actions/chat";

export const ShowChatRecipientList: React.FC = () => {
  const showChatRecipientListValue = useSelector(
    (state: any) => state.chat.showChatRecipientList
  );
  const dispatch: any = useDispatch();

  const showChatRecipientListHandler = () => {
    dispatch(showChatRecipientList());

    if (window.innerWidth < 640) {
      dispatch(hideChat());
    }
  };
  const hideRecipientListHandler = () => {
    dispatch(hideChatRecipientList());
  };
  const hideChatHandler = () => {
    dispatch(hideChat());
  };

  return (
    <Fragment>
      <div
        className="grid place-items-center w-12 h-12 rounded-[50px]
            bg-primary fixed  bottom-[1vh] right-[5vh] shadow-2xl z-[500]"
      >
        {!showChatRecipientListValue && (
          <svg
            className="w-7 h-7 text-gray-100 cursor-pointer"
            onClick={() => showChatRecipientListHandler()}
          >
            <use href={`${sprite}#icon-chat`}></use>
          </svg>
        )}
        {showChatRecipientListValue && (
          <svg
            className="w-7 h-7 fill-gray-100 cursor-pointer"
            onClick={() => {
              hideRecipientListHandler(), hideChatHandler();
            }}
          >
            <use href={`${sprite}#icon-cross-small`}></use>
          </svg>
        )}
      </div>
    </Fragment>
  );
};
