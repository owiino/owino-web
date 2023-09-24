import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import sprite from "../../../assets/icons/sprite.svg";
import { twMerge } from "tailwind-merge";

interface AppImagePickerProps {
  onSave: (photo: string) => void;
  className?: string;
  icon?: string;
  iconClassName?: string;
  label?: string;
  labelClassName?: string;
  iconWrapperClassName?: string;
}

export const AppImagePicker: React.FC<AppImagePickerProps> = (props) => {
  const [photo, setPhoto] = useState<any>(null);

  // TODO: consider adding error handling for better user experience
  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "ArrayBuffer",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },

    maxFileSize: 5,
  });
  useEffect(() => {
    filesContent.map((file) => {
      return setPhoto(file.content);
    });
  }, [filesContent]);

  const saveHandler = () => {
    props.onSave(photo);
  };
  useEffect(() => {
    saveHandler();
  }, [photo]);

  return (
    <Fragment>
      <div>
        {!photo && (
          <div
            className={twMerge(`cursor-pointer`, props.className)}
            onClick={() => openFileSelector()}
          >
            <span
              className={twMerge(`cursor-pointer`, props.iconWrapperClassName)}
            >
              <svg
                className={twMerge(
                  `w-6 h-6 fill-gray-600`,
                  props.iconClassName
                )}
              >
                <use href={`${sprite}#icon-${props.icon}`}></use>
              </svg>
            </span>
            <span
              className={twMerge(`w-6 h-6 fill-gray-600`, props.labelClassName)}
            >
              {props.label}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};
