import React, { Fragment } from "react";
import { PhoneForm } from "./PhoneForm";
import { AddProductHeader } from "../AddProductHeader";

interface DetailedFormProps {
  category: any;
}

export const ProductDetailedForm: React.FC<DetailedFormProps> = (props) => {
  console.log(props);
  // TODO: conditionally(base on the selected category) render forms here
  //   TODO: create a utility function to check whether an object contains children
  return (
    <Fragment>
      <div className="w-full grid place-items-center space-y-8">
        <AddProductHeader className="sm:w-[500px] md:w-[640px]" />
        <PhoneForm />
      </div>
    </Fragment>
  );
};
