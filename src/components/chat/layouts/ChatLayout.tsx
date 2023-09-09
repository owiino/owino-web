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
import { Messages } from "../../../utils";
import { Socket } from "socket.io-client";

interface ChatLayoutProps {
  socket: Socket;
}

export const ChatLayout: React.FC<ChatLayoutProps> = (props) => {
  // TODO: hook to constantly check internet connectivity
  // TODO: hook to auto-reconnection to the chatroom
  const [chatMessage, setChatMessage] = useState<string>("");

  const onSubmitHandler = (message: string) => {
    setChatMessage(message);
  };

  console.log("chatMessage", chatMessage); //To be removed
  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );

  const createdAt = new Date().toISOString();
  const chatRoomId = generateChatRoomId(currentUser.userId, recipient.userId);
  const effectRan = useRef(false);
  const dispatch: any = useDispatch();

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
      props.socket.emit("sendMessage", newMessage);
      console.log("message sent", newMessage);
    };
    sendMessageHandler();
  }, [chatMessage]);

  useEffect(() => {
    if (effectRan.current === false) {
      props.socket.on("receiveMessage", (message: IChatMessage) => {
        dispatch(addToMessageList(message));
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

  const messages = new Messages(currentUser, recipient).organize(messageList);

  console.log("messages", messages);

  return (
    <Fragment>
      <div
        className="w-[90%] sm:w-96 h-[90vh] fixed bottom-[5vh] z-[500]
         right-[5%] sm:right-[15%] lg:right-[10%] flex items-end justify-center"
      >
        <div
          className=" bg-gray-50 rounded-md shadow-2xl p-4 pt-3 borders-[1px]
         border-gray-200 space-y-4 flex flex-col items-start  h-auto
          "
        >
          <ChatHeader
            recipientName={"Tibesigwa"}
            recipientRole={"Buyer"}
            recipientImageUrl={""}
            onChatClose={() => {}}
          />
          <ChatNotification message={notificationMessage} type={"default"} />
          <ChatMessages messages={[]} />
          <ChatForm onSubmit={onSubmitHandler} />
        </div>
      </div>
    </Fragment>
  );
};
