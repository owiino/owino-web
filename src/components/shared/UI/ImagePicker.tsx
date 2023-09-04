import React, { useEffect, Fragment, useState, useCallback } from "react";
import { useRef } from "react";
import { useFilePicker } from "use-file-picker";
import Webcam from "react-webcam";
import { IconButton } from "./IconButton";
import { Button } from "./Button";
import { DragDrop } from "./DragDrop";
import { dataUriToArrayBuffer } from "../../../utils.ts";
import sprite from "../../../assets/icons/sprite.svg";

const CloseCamera = ({ onClose }: { onClose: any }) => {
  return (
    <Fragment>
      <div
        className="absolute -top-2 -right-2 bg-gray-100 rounded-[50%] 
        p-1 z-[800] cursor-pointer shadow-md"
        onClick={() => onClose()}
      >
        <svg className="w-4 h-4 fill-gray-dark-2  ">
          <use href={`${sprite}#icon-cross-small`}></use>
        </svg>
      </div>
    </Fragment>
  );
};

const videoConstraints = {
  width: 380,
  height: 380,
  facingMode: "user",
};
interface ImagePickerProps {
  onSave: (photo: string) => void;
}

export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const [photo, setPhoto] = useState<any>(null);
  const webcamRef = useRef<any>(null);
  const [showCamera, setShowCamera] = useState<Boolean>(false);

  const showCameraHandler = () => setShowCamera(true);
  const hideCameraHandler = () => setShowCamera(false);

  const [openFileSelector, { filesContent }] = useFilePicker({
    readAs: "ArrayBuffer",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },

    maxFileSize: 50,
  });
  useEffect(() => {
    filesContent.map((file) => {
      return setPhoto(file.content);
    });
  }, [filesContent]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imgBuffer = await dataUriToArrayBuffer(imageSrc);
    setPhoto(() => imgBuffer);
  }, [webcamRef]);

  const onDragHandler = (file: any) => {
    setPhoto(file);
  };

  const saveHandler = () => {
    props.onSave(photo);
  };
  useEffect(() => {
    saveHandler();
  }, [photo]);

  return (
    <Fragment>
      <div
        className="flex items-center justify-between gap-x-2 relative
            w-full"
      >
        {!photo && (
          <div className="absolute -top-64 left-20">
            <DragDrop onDrag={onDragHandler} />
          </div>
        )}
        {!photo && (
          <IconButton
            icon="upload"
            onClick={() => openFileSelector()}
            label="Pick image"
            iconClass="w-6 h-6 fill-gray-light-2"
            className="font-bold"
          />
        )}
        {!photo && !showCamera && (
          <IconButton
            className="font-bold"
            icon="camera"
            label="Take photo"
            iconClass="w-6 h-6 fill-gray-light-2"
            onClick={() => showCameraHandler()}
          />
        )}
        {!photo && showCamera && (
          <IconButton
            className="font-bold"
            icon="camera"
            label="Capture"
            iconClass="w-6 h-6 fill-gray-light-2"
            onClick={() => {
              capture();
            }}
          />
        )}
        {!photo && showCamera && (
          <div className="absolute -top-[264px] left-16">
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={220}
              videoConstraints={videoConstraints}
            />
            <CloseCamera onClose={hideCameraHandler} />
          </div>
        )}
        {photo && (
          <Button
            onClick={() => setPhoto(null)}
            className="rounded-md px-4 font-bold"
          >
            Cancel
          </Button>
        )}
      </div>
    </Fragment>
  );
};
