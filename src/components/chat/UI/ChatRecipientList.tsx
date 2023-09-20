import React, { Fragment, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { updateCurrentRecipient } from "../../../store/actions/chat";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getChatRecipients } from "../../../API/chat";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { Socket } from "socket.io-client";
import { TUser } from "../../../types/auth";
import { showChat } from "../../../store/actions/chat";
import { hideChatRecipientList } from "../../../store/actions/chat";

interface ChatRecipientListProps {
  socket: Socket;
}

export const ChatRecipientList: React.FC<ChatRecipientListProps> = (props) => {
  const currentUserId: number = useSelector(
    (state: any) => state.auth.user.userId
  );
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const dispatch: any = useDispatch();
  const [recipientList, setRecipientList] = useState<TUser[]>([]);
  const [activeRecipient, setActiveRecipient] = useState<TUser>(recipient);

  const showChatHandler = () => {
    dispatch(showChat());
  };

  const { isLoading, data } = useQuery(
    ["chatRecipientList"],
    () => {
      return getChatRecipients({
        userId: currentUserId,
        accessToken: accessToken,
      });
    },
    {
      onSuccess: (data: any) => {
        console.log("data for recipient messages", data);
        setRecipientList(() => data.data.recipients);
      },
      onError: (error: any) => {
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      },
    }
  );

  // TODO: show custom loader here
  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No data fetched(Recipient)</p>;

  const joinChatRoom = async (recipient: TUser) => {
    const chatRoomId = generateChatRoomId(currentUserId, recipient.userId);
    dispatch(updateCurrentRecipient(recipient));
    props.socket.emit("joinRoom", {
      chatRoomId: chatRoomId,
      userId: currentUserId,
    });
    setActiveRecipient(recipient);
  };

  const hideRecipientListHandler = () => {
    dispatch(hideChatRecipientList());
  };

  return (
    <Fragment>
      <div
        className="w-full sm:w-60 border-[1px] border-gray-ligh
            rounded-md rounded-tl-lgs shadow-2xl animate-opacityZeroToFull"
      >
        <div
          className="flex items-center justify-between border-b-[1px] 
            border-primary p-4 bg-primary rounded-tl-md rounded-tr-md"
        >
          <span className="text-gray-50">Messaging</span>
          <svg
            className="w-6 h-6 fill-gray-100 cursor-pointer"
            onClick={() => hideRecipientListHandler()}
          >
            <use href={`${sprite}#icon-cross-small`}></use>
          </svg>
        </div>
        {/* <div>
          <SearchMessages />
        </div> */}
        <div>
          {recipientList.map((recipient: TUser, index: number) => {
            return (
              <div
                className={`relative p-4 flex items-center justify-start border-b-[1px]
                    border-gray-light-3 cursor-pointer  ${
                      recipient.userId == activeRecipient?.userId
                        ? "bg-gray-200"
                        : "bg-gray-50"
                    }`}
                key={index + 1}
                onClick={() => {
                  joinChatRoom(recipient), showChatHandler();
                }}
              >
                {recipient.imageUrl && (
                  <div
                    className="bg-gray-light-3 flex items-center justify-center 
                        w-10 h-10 rounded-[50%]"
                  >
                    <img
                      src={recipient.imageUrl}
                      alt={recipient.firstName}
                      className="w-full  h-full rounded-[50%]"
                    />
                  </div>
                )}
                {!recipient.imageUrl && (
                  <div
                    className="bg-gray-light-3 flex items-center justify-center 
                        w-10 h-10 rounded-[50%]"
                  >
                    <svg className="w-6 h-6 fill-gray-600">
                      <use href={`${sprite}#icon-person-filled`}></use>
                    </svg>
                  </div>
                )}
                <div className="px-2 text-sm text-gray-800">
                  <p className="font-bold">
                    {recipient.firstName} {recipient.lastName}
                  </p>
                  {/* <p className="text-gray-500">{"recipient.lastChatMessage"}</p> */}
                  {/* <p className="text-gray-500">{"Last message"}</p> */}
                </div>
                <span className="absolute top-4 right-4 text-[12px]">
                  {/* {"recipient.chatMessageDate"} */}
                  {/* {"Last date"} */}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
