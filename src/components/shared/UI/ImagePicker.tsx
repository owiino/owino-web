import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { IconButton } from "./IconButton";

interface ImagePickerProps {
  onSave: (photo: string) => void;
}

export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const [photo, setPhoto] = useState<any>(null);

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
  //   TODO: include webcam capture
  //   TODO: include drag and drop

  const saveHandler = () => {
    props.onSave(photo);
  };
  useEffect(() => {
    saveHandler();
  }, [photo]);

  return (
    <Fragment>
      <div className="flex items-center justify-center gap-x-2">
        {!photo && (
          <IconButton
            icon="cloud-check"
            onClick={() => openFileSelector()}
            label="Choose from computer"
            iconClass="w-6 h-6 fill-gray-light-2"
          />
        )}
        {photo && (
          <IconButton
            icon="cross"
            onClick={() => setPhoto(null)}
            label="Cancel"
            iconClass="w-3 h-3 fill-gray-light-2"
          />
        )}
      </div>
    </Fragment>
  );
};
