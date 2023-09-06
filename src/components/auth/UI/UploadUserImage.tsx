import React, { Fragment, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { TAuthState } from "../../../types/auth";
import { ImagePicker } from "../../shared/UI/ImagePicker";
import { uploadUserImage } from "../../../API/auth";
import { Modal } from "../../shared/UI/Modal";
import sprite from "../../../assets/icons/sprite.svg";

const OpenModalElement = () => {
  return (
    <Fragment>
      <div
        className="bg-gray-300s bg-primary-light flex items-center justify-center 
           w-16 h-16 rounded-[50%] relative"
      >
        <svg className="w-10 h-10 fill-gray-600s fill-gray-200">
          <use href={`${sprite}#icon-person-filled`}></use>
        </svg>
        <div
          className="w-8 h-8 bg-primary-lights bg-gray-300 grid rounded-[50%]
               place-items-center absolute -right-[9px] bottom-0"
        >
          <svg className="w-[14px] h-[14px] fill-gray-800 cursor-pointer">
            <use href={`${sprite}#icon-edit`}></use>
          </svg>
        </div>
      </div>
    </Fragment>
  );
};

export const UploadUserImage: React.FC = () => {
  const [imageArrayBuffer, setImageArrayBuffer] = useState<any>(null);

  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const user = useSelector((state: TAuthState) => state.auth.user);
  const dispatch: any = useDispatch();

  const imageSelectHandler = (image: any) => {
    setImageArrayBuffer(image);
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: uploadUserImage,
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

  const uploadUserImageHandler = async () => {
    const formData = new FormData();
    const imageName = `${user?.firstName}-${user?.lastName}.png`;
    formData.append(
      "file",
      new Blob([imageArrayBuffer], { type: "image/*" }),
      imageName
    );
    const userId = user?.userId;

    if (!userId) {
      console.log("No userId is provided");
      return;
    }
    mutate({ userId, formData, accessToken });
  };

  const imageURL = () => {
    const blob = new Blob([imageArrayBuffer], { type: "image/*" });
    return URL.createObjectURL(blob);
  };

  return (
    <Fragment>
      <Modal
        openModalElement={<OpenModalElement />}
        onModalClose={() => {}}
        className="sm:w-96"
      >
        <div className="px-4">
          <div className="py-3 text-lg">
            <span>Upload image</span>
          </div>
          <div
            className="flex items-center justify-center bg-gray-300 
                w-full h-72 rounded-md"
          >
            {imageArrayBuffer && (
              <img src={imageURL()} className="w-40 h-40 rounded-[50%]" />
            )}
          </div>
          <div className="flex items-center justify-between py-3">
            <ImagePicker onSave={imageSelectHandler} />
            {imageArrayBuffer && !isLoading && (
              <Button
                type="submit"
                className="rounded-md px-4 font-bold"
                onClick={() => {
                  uploadUserImageHandler();
                }}
              >
                Upload
              </Button>
            )}
            {imageArrayBuffer && isLoading && (
              <Spinner className="w-40" label="Uploading" />
            )}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
