import React, { Fragment, useState } from "react";
import { ProductLocationCategoryForm } from "../UI/ProductLocationCategoryForm";
import { AddProductImages } from "../UI/AddProductImages";
import { Button } from "../../shared/UI/Button";
import { AddProductHeader } from "../UI/AddProductHeader";
import { LocationSelector } from "../../shared/UI/LocationSelector";
import { TSelectedLocation } from "../../../types/location";

type TFile = {
  content: any;
  name: string;
  type: string;
};

export const AddProductLayout: React.FC = () => {
  const [imageFileList, setImageFileList] = useState<TFile[]>([]);
  const [location, setLocation] = useState<TSelectedLocation>();

  const saveImageListHandler = (images: TFile[]) => {
    setImageFileList(() => images);
  };

  const selectLocationHandler = (location: TSelectedLocation) => {
    setLocation(() => location);
  };

  console.log("imageFileList", imageFileList);
  // TODO: image list validation here (number images based on the category image limit)

  console.log("location", location);

  return (
    <Fragment>
      <div className="w-full grid place-items-center mt-14 space-y-8">
        <AddProductHeader />
        <div
          className="flex flex-col items-center justify-center 
           w-[90%] xs:w-[448px] bg-gray-50 rounded-md p-6"
        >
          <ProductLocationCategoryForm />
          <LocationSelector label="Location" onSelect={selectLocationHandler} />
          <AddProductImages
            onSaveImages={saveImageListHandler}
            minPhotoNumber={3}
          />
          <Button className="w-full mt-4">Next</Button>
        </div>
      </div>
    </Fragment>
  );
};
