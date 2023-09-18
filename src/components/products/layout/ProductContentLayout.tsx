import React, { Fragment } from "react";
import { Product } from "../UI/Product";
import { ProductCategories } from "./ProductCategories";

export const ProductContentLayout: React.FC = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // TODO: to track the saved product here
  // TODO: TO implement find and replace the saved product status in the products array
  // TODO: To create component name "ProductList"
  // TODO: To create component name "TopProducts"
  // TODO: To create component name "TrendingProducts"

  return (
    <Fragment>
      <div
        className="lg:flex items-start justify-between gap-3 
         p-4 sm:p-8 relative"
      >
        <div className="relatives w-full lg:w-auto">
          <ProductCategories />
        </div>
        <div className="lg:flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-5 gap-3">
            {products.map((num) => {
              return (
                <div key={num}>
                  <Product saved={false} onSave={() => {}} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
