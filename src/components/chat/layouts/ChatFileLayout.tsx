import React, { Fragment, useState, useEffect } from "react";
import { AppImagePicker } from "../../shared/UI/AppImagePicker";
import { AppDocumentPicker } from "../../shared/UI/AppDocumentPicker";
import { ChatFileUpload } from "../UI/ChatFileUpload";
import sprite from "../../../assets/icons/sprite.svg";

interface ChatFileOverlayProps {
  onClose: () => void;
}
const ChatFileOverlay: React.FC<ChatFileOverlayProps> = (props) => {
  return (
    <Fragment>
      <div
        className="fixeds top-0 left-0 w-[100vw] h-[100vh]"
        onClick={props.onClose}
      />
    </Fragment>
  );
};

interface ChatFileLayoutProps {
  onCloseChatFile: (value: boolean) => void;
}

export const ChatFileLayout: React.FC<ChatFileLayoutProps> = (props) => {
  const [file, setFile] = useState<any>(null);
  const [isUploaded, setIsUploaded] = useState<any>(false);

  const onSaveHandler = (file: any) => {
    setFile(() => file);
  };

  const onCloseChatFileHandler = () => {
    props.onCloseChatFile(false);
  };

  const onClearFileHandler = (file: any) => {
    setFile(() => file);
  };

  const onUploadHandler = (value: boolean) => {
    setIsUploaded(() => value);
  };

  useEffect(() => {
    if (!isUploaded) return;
    console.log("Uploaded");
    onCloseChatFileHandler();
  }, [isUploaded]);

  // TODO: disable close icons while uploading

  return (
    <Fragment>
      <div
        className="w-full h-[60vh] bg-gray-50 absolute 
        bottom-0 left-0 z-50 rounded-md animate-opacityZeroToFull
        shadow-md p-4 border-[1px] border-gray-opacity"
      >
        <svg
          className="w-5 h-5 fill-gray-600 absolute top-2 right-4
          cursor-pointer"
          onClick={() => onCloseChatFileHandler()}
        >
          <use href={`${sprite}#icon-cross-small`}></use>
        </svg>
        {!file && (
          <div className="w-full flex flex-col justify-center  gap-y-4 pt-6">
            {/*TODO: To be changed image icon*/}
            <AppImagePicker
              onSave={onSaveHandler}
              className="flex items-center bg-primary-light p-2 gap-x-2 rounded-md"
              icon="attach-file"
              iconWrapperClassName="bg-gray-50 p-2 rounded-[50%]"
              iconClassName="w-6 h-6 fill-primary-light"
              label="Image"
              labelClassName="text-gray-50"
            />
            <AppDocumentPicker
              onSave={onSaveHandler}
              className="flex items-center bg-primary-light p-2 gap-x-2 rounded-md"
              icon="attach-file"
              iconWrapperClassName="bg-gray-50 p-2 rounded-[50%]"
              iconClassName="w-6 h-6 fill-primary-light"
              label="Document"
              labelClassName="text-gray-50"
            />
            <ChatFileOverlay onClose={() => {}} />
          </div>
        )}
        {file && (
          <ChatFileUpload
            file={file}
            clearFile={onClearFileHandler}
            onUpload={onUploadHandler}
          />
        )}
      </div>
    </Fragment>
  );
};
