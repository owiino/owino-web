import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentRecipient } from "../../../store/actions/chat";
import { showChatRecipientList, hideChat } from "../../../store/actions/chat";

import { IconButton } from "../../shared/UI/IconButton";
import { TUser } from "../../../types/auth";

export const StartChat: React.FC = () => {
  const recipient: TUser = useSelector((state: any) => state.user.seller);

  const dispatch: any = useDispatch();

  const showChatRecipientListHandler = () => {
    dispatch(showChatRecipientList());

    if (window.innerWidth < 640) {
      dispatch(hideChat());
    }
  };

  const updateCurrentRecipientHandler = () => {
    dispatch(updateCurrentRecipient(recipient));
    showChatRecipientListHandler();
  };

  return (
    <Fragment>
      <IconButton
        type="button"
        icon="chat-filled"
        label="Start chat"
        iconClass="fill-gray-100 w-6 h-6"
        className="w-full"
        onClick={() => updateCurrentRecipientHandler()}
      />
    </Fragment>
  );
};
