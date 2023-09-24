import React, { Fragment, useRef, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
// import { Spinner } from "../../shared/UI/Loader/Spinner";
import { TAuthState } from "../../../types/auth";

interface ChatFileUploadProps {
  file: any;
  clearFile: (value: any) => void;
}

export const ChatFileUpload: React.FC<ChatFileUploadProps> = (props) => {
  const captionRef = useRef<any>(null);

  const file = props.file;

  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const user = useSelector((state: TAuthState) => state.auth.user);
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: "mutation fn here",
    onSuccess: (data: any) => {
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const uploadChatFileHandler = async () => {
    const formData = new FormData();
    const imageName = `${user?.firstName}-${user?.lastName}.png`;
    formData.append("file", new Blob([file], { type: "image/*" }), imageName);
    // TODO: append mesage object here
    const userId = user?.userId;

    if (!userId) {
      console.log("No userId is provided");
      return;
    }
    mutate({ userId, formData, accessToken });
  };

  const imageURL = () => {
    const blob = new Blob([file], { type: "image/*" });
    return URL.createObjectURL(blob);
  };

  console.log("props.file");
  console.log(props.file);
  // TODO: File upload handler here
  // TODO: To implement onChatFileClose via props

  const clearFileHandler = () => {
    props.clearFile(null);
  };

  return (
    <Fragment>
      {/* Preview file elements here */}
      <div
        className="animate-opacityZeroToFull mt-6 space-y-3 flex
           flex-col items-center justify-center h-[93%]"
      >
        <div className="space-y-2 w-full flex-1">
          <span className="text-sm text-red-500 text-center w-full">
            Error message here
          </span>
          {/* File image here */}
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
          {/*  Image file here */}
          {/* None image file  here */}
        </div>
        <form
          onSubmit={() => uploadChatFileHandler()}
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
          <button type="submit">
            <svg className="w-6 h-6 fill-gray-600 hover:fill-primary transition-all">
              <use href={`${sprite}#icon-send`}></use>
            </svg>
          </button>
        </form>
      </div>
    </Fragment>
  );
};
