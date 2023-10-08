import React, { Fragment, useState } from "react";
import { ProductCategorySelector } from "../UI/ProductCategorySelector";
import { AddProductImages } from "../UI/AddProductImages";
import { Button } from "../../shared/UI/Button";
import { AddProductHeader } from "../UI/AddProductHeader";
import { LocationSelector } from "../../shared/UI/LocationSelector";
import { TSelectedLocation } from "../../../types/location";
import { TCategory } from "../../../types/category";

type TFile = {
  content: any;
  name: string;
  type: string;
};

interface BasicInfoProps {
  onNextClick: (clicked: boolean) => void;
}

export const AddProductBasicInfo: React.FC<BasicInfoProps> = (props) => {
  const [imageFileList, setImageFileList] = useState<TFile[]>([]);
  const [location, setLocation] = useState<TSelectedLocation>();
  const [category, setCategory] = useState<TCategory>();

  const saveImageListHandler = (images: TFile[]) => {
    setImageFileList(() => images);
  };

  const selectLocationHandler = (location: TSelectedLocation) => {
    setLocation(() => location);
  };

  const selectCategoryHandler = (category: TCategory) => {
    setCategory(() => category);
  };

  console.log("imageFileList", imageFileList);
  // TODO: image list validation here (number images based on the category image limit)

  console.log("location", location);
  console.log("category", category);

  //   On click next validate all values, save to local storage and redux store
  const nextClickHandler = () => {
    props.onNextClick(true);
  };

  return (
    <Fragment>
      <div className="w-full grid place-items-center mt-14 space-y-8">
        <AddProductHeader />
        <div
          className="flex flex-col items-center justify-center 
             w-[90%] xs:w-[448px] bg-gray-50 rounded-md p-6"
        >
          <ProductCategorySelector onSelect={selectCategoryHandler} />
          <LocationSelector label="Location" onSelect={selectLocationHandler} />
          <AddProductImages
            onSaveImages={saveImageListHandler}
            minPhotoNumber={3}
          />
          <Button className="w-full mt-4" onClick={() => nextClickHandler()}>
            Next
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
