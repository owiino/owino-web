import React, { Fragment, useState } from "react";
import { Product } from "../UI/Product";
import { ProductCategories } from "./ProductCategories";
import { getAllProducts } from "../../../API/product";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { TGetProduct } from "../../../types/product";

export const ProductContentLayout: React.FC = () => {
  // const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [products, setProducts] = useState<TGetProduct[]>([]);

  const dispatch: any = useDispatch();

  // TODO: to track the saved product here
  // TODO: TO implement find and replace the saved product status in the products array
  // TODO: To create component name "ProductList"
  // TODO: To create component name "TopProducts"
  // TODO: To create component name "TrendingProducts"

  // Get all products

  const { isLoading } = useQuery([`products`], getAllProducts, {
    onSuccess: (data: any) => {
      setProducts(() => data.data.products);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  console.log("isLoading");
  console.log(isLoading);

  return (
    <Fragment>
      <div
        className="lg:flex items-start justify-between gap-3 
         p-4 sm:p-8"
      >
        <div className="w-full lg:w-auto lg:sticky lg:top-10">
          <ProductCategories />
        </div>
        <div className="lg:flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 2xl:grid-cols-5 gap-3">
            {/* {products.map((num) => { */}
            {products.map((product) => {
              return (
                <div key={product.productId}>
                  <Product
                    productData={product}
                    saved={false}
                    onSave={() => {}}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
