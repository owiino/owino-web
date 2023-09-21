import React, { Fragment, useState, useRef, useEffect } from "react";
import { ChatHeader } from "../UI/ChatHeader";
import { ChatNotification } from "../UI/ChatNotification";
import { ChatForm } from "../UI/ChatForm";
import { ChatMessages } from "../UI/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { addToMessageList } from "../../../store/actions/chat";
import { IChatMessage } from "../../../types/chat";
import { TUser } from "../../../types/auth";
import { Socket } from "socket.io-client";
import { TAlertMessage } from "../../../types/chat";
import { getChatMessages } from "../../../API/chat";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { updateMessageList } from "../../../store/actions/chat";
import { MessageLoader } from "../UI/MessageLoader";

interface ChatAggregatorProps {
  socket: Socket;
}

export const ChatAggregator: React.FC<ChatAggregatorProps> = (props) => {
  // TODO: hook to constantly check internet connectivity
  // TODO: hook to auto-reconnection to the chatroom
  const [chatMessage, setChatMessage] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<TAlertMessage>({
    message: "",
    type: "",
  });

  const onSubmitHandler = (message: string) => {
    setChatMessage(message);
  };

  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const createdAt = new Date().toISOString();
  const chatRoomId = generateChatRoomId(currentUser.userId, recipient.userId);
  const effectRan = useRef(false);
  const dispatch: any = useDispatch();
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );

  const { isLoading } = useQuery(
    [`${chatRoomId}-messageList`],
    () => {
      return getChatMessages({
        chatRoomId: chatRoomId,
        accessToken: accessToken,
      });
    },
    {
      onSuccess: (data: any) => {
        dispatch(updateMessageList(data.data.messages));
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

  const newMessage: IChatMessage = {
    senderId: currentUser.userId,
    recipientId: recipient.userId,
    chatRoomId: chatRoomId,
    message: chatMessage,
    isRead: false,
    isDelivered: false,
    createdAt: createdAt,
    showMessage: true,
  };

  useEffect(() => {
    const sendMessageHandler = () => {
      if (!chatMessage) return;
      dispatch(addToMessageList(newMessage));
      props.socket.emit("sendChatMessage", newMessage);
    };
    sendMessageHandler();
  }, [chatMessage]);

  useEffect(() => {
    if (effectRan.current === false) {
      props.socket.on("receiveChatMessage", (message: IChatMessage) => {
        dispatch(addToMessageList(message));
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [props.socket]);

  useEffect(() => {
    if (effectRan.current === false) {
      props.socket.on("receiveAlertMessage", (message: TAlertMessage) => {
        setAlertMessage(() => message);
      });
      return () => {
        effectRan.current = true;
      };
    }
  }, [props.socket]);

  const messageList: IChatMessage[] = useSelector(
    (state: any) => state.chat.messageList
  );

  const notificationMessage =
    "Messages here are only viewed btn and seller. Not even owino can see the messages";

  return (
    <Fragment>
      <div
        className="w-full sm:w-96 bg-gray-50 rounded-md shadow-2xl p-4 pt-3 borders-[1px]
         border-gray-200 space-y-4 flex flex-col items-start  h-auto animate-opacityZeroToFull
           relative"
      >
        <ChatHeader
          recipientName={`${recipient.firstName} ${recipient.lastName}`}
          recipientRole={`${recipient.role}`}
          recipientImageUrl={`${recipient.imageUrl}`}
          onChatClose={() => {}}
        />
        <ChatNotification
          message={
            alertMessage.message ? alertMessage.message : notificationMessage
          }
          type={alertMessage.type ? alertMessage.type : "default"}
        />
        {isLoading && <MessageLoader />}
        <ChatMessages messages={messageList} />
        <ChatForm onSubmit={onSubmitHandler} />
      </div>
    </Fragment>
  );
};
