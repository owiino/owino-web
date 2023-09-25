import React, { Fragment, useRef, useState, useEffect } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { TAuthState, TUser } from "../../../types/auth";
import { generateChatRoomId } from "../../../utils/generateChatRoomId";
import { postChatFile } from "../../../API/chat";
import { addToMessageList } from "../../../store/actions/chat";
import { DotsLoader } from "../../shared/UI/Loader";

interface ChatFileUploadProps {
  file: any;
  clearFile: (value: any) => void;
  onUpload: (value: boolean) => void;
}

export const ChatFileUpload: React.FC<ChatFileUploadProps> = (props) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const captionRef = useRef<any>(null);
  const file = props.file;
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const user = useSelector((state: TAuthState) => state.auth.user);
  const dispatch: any = useDispatch();

  const currentUser: TUser = useSelector((state: any) => state.auth.user);
  const recipient: TUser = useSelector(
    (state: any) => state.chat.currentRecipient
  );
  const createdAt = new Date().toISOString();
  const chatRoomId = generateChatRoomId(currentUser.userId, recipient.userId);

  /***
   * If caption has not been provided, a default value of "FILE" is attached
   */
  const fileCaption: string = captionRef.current?.value
    ? captionRef.current.value
    : "FILE";

  const newMessage: any = {
    senderId: currentUser.userId,
    recipientId: recipient.userId,
    chatRoomId: chatRoomId,
    message: fileCaption,
    isRead: false,
    isDelivered: false,
    createdAt: createdAt,
    showMessage: true,
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: postChatFile,
    onSuccess: (data: any) => {
      console.log("data", data);
      dispatch(addToMessageList(data.data.message));
      setIsUploaded(() => true);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const uploadChatFileHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    const imageName = `${user?.firstName}-${user?.lastName}.png`;
    formData.append("file", new Blob([file], { type: "image/*" }), imageName);
    formData.append("message", JSON.stringify(newMessage));
    const userId = user?.userId;

    if (!userId) {
      return;
    }
    mutate({ formData, accessToken });
  };

  const imageURL = () => {
    const blob = new Blob([file], { type: "image/*" });
    return URL.createObjectURL(blob);
  };

  const clearFileHandler = () => {
    props.clearFile(null);
  };

  const onUploadHandler = () => {
    props.onUpload(true);
  };

  useEffect(() => {
    if (!isUploaded) return;
    console.log("Uploaded");
    onUploadHandler();
  }, [isUploaded]);

  // TODO: disable close icons while uploading

  return (
    <Fragment>
      <div
        className="animate-opacityZeroToFull mt-6 space-y-3 flex
           flex-col items-center justify-center h-[93%]"
      >
        <div className="space-y-2 w-full flex-1">
          <span className="text-sm text-red-500 text-center w-full">
            Error message here
          </span>
          <div
            className="w-full flex items-center justify-center
               bg-gray-300 py-8 rounded-md relative"
          >
            <img
              src={imageURL()}
              alt="chat-image-file"
              className="w-4/5 aspect-[4/3] rounded"
            />
            {/* To add file size here */}
            <svg
              className="w-5 h-5 fill-gray-600 absolute top-2 left-2
               cursor-pointer"
              onClick={() => clearFileHandler()}
            >
              <use href={`${sprite}#icon-cross-small`}></use>
            </svg>
          </div>
          {/* None image file  here */}
        </div>
        <form
          onSubmit={(event) => uploadChatFileHandler(event)}
          className="flex items-center justify-between bg-gray-300 
           w-full p-4 py-3 rounded-full"
        >
          <input
            type="text"
            required
            ref={captionRef}
            placeholder="Add a caption"
            className="flex-1 outline-none bg-inherit placeholder:text-gray-600
             cursor-text-blue-500 w-4/5 text-gray-800"
            id="input-field"
          />
          {isLoading && (
            <button type="submit" disabled={isLoading}>
              <svg className="w-6 h-6 fill-gray-600 hover:fill-primary transition-all">
                <use href={`${sprite}#icon-send`}></use>
              </svg>
            </button>
          )}
          {!isLoading && (
            <div className="bg-gray-300">
              <DotsLoader />
            </div>
          )}
        </form>
      </div>
    </Fragment>
  );
};
