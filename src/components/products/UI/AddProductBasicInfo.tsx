import React, { Fragment, useState } from "react";
import { ProductCategorySelector } from "../UI/ProductCategorySelector";
import { AddProductImages } from "../UI/AddProductImages";
import { Button } from "../../shared/UI/Button";
import { AddProductHeader } from "../UI/AddProductHeader";
import { LocationSelector } from "../../shared/UI/LocationSelector";
import { TSelectedLocation } from "../../../types/location";
import { useDispatch, useSelector } from "react-redux";
import { updateProductBasicInfo } from "../../../store/actions/product";
// import {
//   showCardNotification,
//   hideCardNotification,
// } from "../../../store/actions/notification";

interface BasicInfoProps {
  onNextClick: (clicked: boolean) => void;
}

export const AddProductBasicInfo: React.FC<BasicInfoProps> = (props) => {
  const [location, setLocation] = useState<TSelectedLocation>({
    region: "",
    district: "",
    division: "",
  });
  // selected category is converted into a string
  // containing names for category and subcategory
  const [category, setCategory] = useState<string>("");
  const dispatch: any = useDispatch();

  const imageFileList = useSelector(
    (state: any) => state.product.newProductImageList
  );

  const selectLocationHandler = (location: TSelectedLocation) => {
    setLocation(() => location);
  };

  const selectCategoryHandler = (category: string) => {
    setCategory(() => category);
  };

  console.log("imageFileList", imageFileList);
  // TODO: image list validation here (number images based on the category image limit)

  console.log("location", location);
  console.log("category", category);

  const nextClickHandler = () => {
    // TODO:validate location and category here

    const basicInfo = {
      location: location,
      category: category,
      imageList: imageFileList,
    };
    dispatch(updateProductBasicInfo({ basicInfo: basicInfo }));
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
          <AddProductImages minPhotoNumber={3} />
          <Button className="w-full mt-4" onClick={() => nextClickHandler()}>
            Next
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
