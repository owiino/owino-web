import React, { Fragment, useState } from "react";
import { AddProductBasicInfo } from "../UI/AddProductBasicInfo";
import { ProductDetailedForm } from "../UI/forms/ProductDetailedForm";

export const AddProductLayout: React.FC = () => {
  const [showDetailedForm, setShowDetailedForm] = useState<boolean>(false);

  const nextClickHandler = (clicked: boolean) => {
    setShowDetailedForm(clicked);
  };

  return (
    <Fragment>
      <div className="w-full grid place-items-center mt-14">
        {!showDetailedForm && (
          <AddProductBasicInfo onNextClick={nextClickHandler} />
        )}
        {showDetailedForm && <ProductDetailedForm category={"phone"} />}
      </div>
    </Fragment>
  );
};
