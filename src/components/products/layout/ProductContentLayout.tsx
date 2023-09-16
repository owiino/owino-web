import React, { Fragment } from "react";
import { Product } from "../UI/Product";

export const ProductContentLayout: React.FC = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // TODO: to track the saved product here
  // TODO: TO implement find and replace the saved product status in the products array

  return (
    <Fragment>
      <div>
        <div className="grid lg:grid-cols-5 gap-3">
          {products.map((num) => {
            return (
              <div key={num}>
                <Product saved={false} onSave={() => {}} />
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
