import React, { Fragment, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { validateProductImages } from "../../../API/product";
import { AppImagePicker } from "../../shared/UI/AppImagePicker";
import { Spinner } from "../../shared/UI/Loader";
import { FileType } from "../../../utils";
// import sprite from "../../../assets/icons/sprite.svg";
import { updateNewProductImageList } from "../../../store/actions/product";

type TFile = {
  content: any;
  name: string;
  type: string;
};

interface AddProductImagesProps {
  minPhotoNumber: number;
}

export const AddProductImages: React.FC<AddProductImagesProps> = (props) => {
  const [imageFile, setImageFile] = useState<TFile>({
    content: null,
    name: "",
    type: "",
  });
  const [imageFileList, setImageFileList] = useState<TFile[]>([]);

  const accessToken = useSelector((state: any) => state.auth.accessToken);
  const dispatch: any = useDispatch();

  const { isLoading, mutate, error } = useMutation({
    mutationFn: validateProductImages,
    onSuccess: (_: any) => {
      setImageFileList((imageFiles) => [...imageFiles, imageFile]);
      dispatch(updateNewProductImageList([...imageFileList, imageFile]));
      setImageFile({
        content: null,
        name: "",
        type: "",
      });
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      setImageFile({
        content: null,
        name: "",
        type: "",
      });
    },
  });

  const onSaveHandler = (imageFile: TFile) => {
    setImageFile(() => imageFile);
  };

  const uploadProductImagesHandler = () => {
    const formData = new FormData();
    const fileListLength = imageFileList.length;

    if (fileListLength === 0) {
      // Append only one file if imageFileList is empty
      formData.append(
        "files",
        new Blob([imageFile.content], { type: imageFile.type }),
        imageFile.name
      );
    } else {
      // images in imageFileList array added are upon successful
      //  validation of the image by the backend
      for (let i = 0; i < fileListLength; i++) {
        formData.append(
          "files",
          new Blob([imageFileList[i].content], {
            type: imageFileList[i].type,
          }),
          imageFileList[i].name
        );
      }
      formData.append(
        "files",
        new Blob([imageFile.content], { type: imageFile.type }),
        imageFile.name
      );
    }

    mutate({ formData: formData, accessToken: accessToken });
  };

  useEffect(() => {
    if (!imageFile.content) return;
    const uploadHandler = () => {
      uploadProductImagesHandler();
    };
    uploadHandler();
  }, [imageFile]);

  const imageURL = (imageFile: TFile): string => {
    const mimeType = new FileType(imageFile.type).getMimeType();
    const imageBlob = new Blob([imageFile.content], { type: mimeType });
    return URL.createObjectURL(imageBlob);
  };
  // TODO: Remove image functionality via svg x icon

  return (
    <Fragment>
      <div className="space-y-2 text-gray-800 w-full">
        <div>
          <h3>Add photo</h3>
          <p className="font-semibold text-gray-600">
            Add at least {props.minPhotoNumber} photos for this category
          </p>
          <p className="text-sm text-gray-600">
            First picture - is title picture.You can change the order of the
            photos
          </p>
        </div>
        <div className="flex items-center justify-start w-full gap-x-2">
          <AppImagePicker
            onSave={onSaveHandler}
            icon="plus-small"
            iconClassName="w-6 h-6 fill-primary"
            iconWrapperClassName="grid place-items-center bg-gray-300 w-20 
             aspect-[4/3] rounded"
          />
          <div className="overflow-x-auto flex items-center justify-start gap-x-2">
            {imageFileList.map((imageFile: TFile, index: number) => {
              return (
                <div
                  className="grid place-items-center bg-gray-700 w-20 h-16  opacity-90
                  rounded"
                  key={index}
                >
                  <img
                    src={imageURL(imageFile)}
                    alt={`product-image-${index}`}
                    className="w-full h-full rounded"
                  />
                </div>
              );
            })}
            {isLoading && (
              <div
                className="grid place-items-center bg-gray-700 w-20  opacity-90
             aspect-[4/3] rounded"
              >
                <Spinner className="text-gray-300 h-6 w-6" />
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Supported format are .png, .jpeg, .jpg, 5mb max
          </p>
        </div>
        <div>
          {error?.message && (
            <span className="text-sm text-red-500 text-start">
              {error?.message}
            </span>
          )}
        </div>
      </div>
    </Fragment>
  );
};
