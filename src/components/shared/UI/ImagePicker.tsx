import React, { useEffect, Fragment, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { IconButton } from "./IconButton";
import { Button } from "./Button";

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
          // TODO: To change to download icon
          <IconButton
            icon="cloud-check"
            onClick={() => openFileSelector()}
            label="Pick image"
            iconClass="w-6 h-6 fill-gray-light-2"
            className="font-bold"
          />
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
