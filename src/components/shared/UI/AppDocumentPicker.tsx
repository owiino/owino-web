import React, { useState, useEffect, Fragment } from "react";
import { FileUploader } from "react-drag-drop-files";
import { inputFileToArrayBuffer } from "../../../utils/index.ts";
import { useDispatch } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import sprite from "../../../assets/icons/sprite.svg";
import { twMerge } from "tailwind-merge";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface DropZoneAreaProps {
  className?: string;
  icon?: string;
  iconClassName?: string;
  label?: string;
  labelClassName?: string;
  iconWrapperClassName?: string;
}

const DropZoneArea: React.FC<DropZoneAreaProps> = (props) => {
  return (
    <Fragment>
      <div className={twMerge(`cursor-pointer`, props.className)}>
        <span className={twMerge(`cursor-pointer`, props.iconWrapperClassName)}>
          <svg
            className={twMerge(`w-6 h-6 fill-gray-600`, props.iconClassName)}
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
    </Fragment>
  );
};

interface AppDocumentPickerProps {
  onSave: (file: any) => void;
  className?: string;
  icon?: string;
  iconClassName?: string;
  label?: string;
  labelClassName?: string;
  iconWrapperClassName?: string;
}

export const AppDocumentPicker: React.FC<AppDocumentPickerProps> = (props) => {
  const [file, setFile] = useState<any>(null);
  const handleChange = (file: any) => {
    setFile(file);
  };

  const dispatch: any = useDispatch();

  const validateFileSize = (file: any) => {
    if (!file) return;
    const validFileSize = 5242880; // 5mb
    const errorMessage = "Dragged image file exceeds limit 5mb";
    if (file.size > validFileSize) {
      dispatch(showCardNotification({ type: "error", message: errorMessage }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      throw new Error(errorMessage);
    }
  };

  const saveHandler = async () => {
    validateFileSize(file);
    const fileArrayBuffer = await inputFileToArrayBuffer(file);
    props.onSave(fileArrayBuffer);
  };

  useEffect(() => {
    saveHandler();
  }, [file]);

  return (
    <Fragment>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        children={
          <DropZoneArea
            className={props.className}
            icon={props.icon}
            iconWrapperClassName={props.iconWrapperClassName}
            iconClassName={props.iconClassName}
            label={props.label}
            labelClassName={props.labelClassName}
          />
        }
      />
    </Fragment>
  );
};
