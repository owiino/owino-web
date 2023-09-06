import React, { useState, useEffect, Fragment } from "react";
import { FileUploader } from "react-drag-drop-files";
import { inputFileToArrayBuffer } from "../../../utils/index.ts";
import { useDispatch } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";

const DropZoneArea = ({ hasFile }: { hasFile: Boolean }) => {
  return (
    <Fragment>
      <div
        className={`bg-gray-700 text-gray-100 w-48 ${
          !hasFile && "animate-pulse"
        }
         h-48 rounded-[50%] flex items-center justify-center`}
      >
        <span className="text-xl font-bold text-center">Drag & Drop Here</span>
      </div>
    </Fragment>
  );
};

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface DragDropProps {
  onDrag: (file: any) => void;
}

export const DragDrop: React.FC<DragDropProps> = (props) => {
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

  const dragHandler = async () => {
    validateFileSize(file);
    const fileArrayBuffer = await inputFileToArrayBuffer(file);
    props.onDrag(fileArrayBuffer);
  };

  useEffect(() => {
    dragHandler();
  }, [file]);

  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      children={<DropZoneArea hasFile={!!file} />}
    />
  );
};
