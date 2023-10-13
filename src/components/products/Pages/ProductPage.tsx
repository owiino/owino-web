import React, { Fragment } from "react";
import { PageLayoutDynamic } from "../../shared/layouts/PageLayoutDynamic";
import { SellerProfile } from "../../users/UI/SellerProfile";
import { SafetyTips } from "../../common/UI/SafetyTips";
import { ProductDetails } from "../UI/ProductDetails";

export const ProductPage: React.FC = () => {
  return (
    <Fragment>
      <PageLayoutDynamic>
        <div className="w-full min-h-[90vh] my-16">
          <div className="lg:grid grid-cols-2">
            <div>
              <ProductDetails />
            </div>
            <div>
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
