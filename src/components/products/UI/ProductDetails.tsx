import React, { Fragment, useState, useEffect } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { TGetProduct } from "../../../types/product";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { getProduct } from "../../../API/product";

export const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [productImages, setProductImages] = useState<any[]>([]);
  const [initialVisibleImageList, setInitialVisibleImageList] = useState<any[]>(
    []
  );

  const [visibleImageNum, setVisibleImageNum] = useState<number>(5);
  const ProductImageList = [1, 2, 3, 4, 5, 6];

  const productOnPage: TGetProduct = useSelector(
    (state: any) => state.product.currentProductOnPage
  );
  const currentWindowWidth: number = useSelector(
    (state: any) => state.shared.currentWindowWidth
  );
  const dispatch: any = useDispatch();
  console.log("currentWindowWidth", currentWindowWidth);

  const { isLoading } = useQuery(
    [`product-${productOnPage.productId}`],
    () => {
      return getProduct(productOnPage.productId);
    },
    {
      onSuccess: (data: any) => {
        setProductDetails(() => data.data.product);
        setProductImages(() => data.data.product.productImages);
      },
      onError: (error: any) => {
        dispatch(
          showCardNotification({ type: "error", message: error.message })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
      },
    }
  );

  useEffect(() => {
    const setVisibleImages = () => {
      if (productImages.length <= visibleImageNum) {
        setInitialVisibleImageList(productImages);
        return;
      }

      const visibleImages = productImages.filter(
        (productImage, index) => index + 1 <= visibleImageNum
      );
      console.log("visibleImages", visibleImages);
    };
    setVisibleImages();
  }, [currentWindowWidth]);

  return (
    <Fragment>
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="w-full">
            <img
              src={productImages[0]?.imageUrl}
              alt=""
              className="w-full h-full aspect-[4/3]"
            />
          </div>
          <div className="flex items-center gap-x-2">
            {ProductImageList.map((productImage: any, index: number) => {
              return (
                <div key={index} className="w-24 h-20">
                  <img
                    src={productImages[0]?.imageUrl}
                    className="w-full h-full aspect-[4/3]"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>ProductName</span>
          <svg className="w-5 h-5 fill-primary">
            <use href={`${sprite}#icon-bookmark`}></use>
          </svg>
        </div>
        <div>Posted time and number of views</div>
        <div>image title(dynamic)</div>
        <div>image title(dynamic)</div>
        <div>image title(dynamic)</div>
      </div>
    </Fragment>
  );
};
