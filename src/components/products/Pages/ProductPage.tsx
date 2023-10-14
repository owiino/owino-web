import React, { Fragment } from "react";
import { PageLayoutDynamic } from "../../shared/layouts/PageLayoutDynamic";
import { SellerProfile } from "../../users/UI/SellerProfile";
import { SafetyTips } from "../../common/UI/SafetyTips";
import { ProductDetails } from "../UI/ProductDetails";

export const ProductPage: React.FC = () => {
  return (
    <Fragment>
      <PageLayoutDynamic>
        <div
          className="w-full min-h-[90vh] my-16 grid place-items-center
           px-4 xs:px-16"
        >
          <div className="lg:grid grid-cols-2 gap-4 space-y-4 lg:space-y-0">
            <div>
              <ProductDetails />
            </div>
            <div
              className="inline-block space-y-4 sm:space-y-0 sm:flex items-start justify-between 
                  gap-x-4 lg:inline-block lg:space-y-4"
            >
              <SellerProfile />
              <SafetyTips />
            </div>
          </div>
          <div>More products of same category here</div>
        </div>
      </PageLayoutDynamic>
    </Fragment>
  );
};
