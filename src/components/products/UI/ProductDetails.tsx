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
import { elapsedTime } from "../../../utils";
import { Spinner } from "../../shared/UI/Loader";
import { Button } from "../../shared/UI/Button";
import { ProductDetailedView } from "./ProductDetailedView";

export const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [productImages, setProductImages] = useState<any[]>([]);
  const [visibleImageList, setVisibleImageList] = useState<any[]>([]);
  const [plusImageNum, setPlusImageNum] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const [visibleImageNum, setVisibleImageNum] = useState<number>(2);

  const productOnPage: TGetProduct = useSelector(
    (state: any) => state.product.currentProductOnPage
  );
  const currentWindowWidth: number = useSelector(
    (state: any) => state.shared.currentWindowWidth
  );
  const dispatch: any = useDispatch();

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

  const visibleImageNumHandler = () => {
    const currentWindowWidth = window.innerWidth;
    const productImageLength = productImages.length;

    if (currentWindowWidth <= 480) {
      setVisibleImageNum(() => 3);
      setPlusImageNum(() => productImageLength - 3);
      return;
    }
    if (currentWindowWidth < 640) {
      setVisibleImageNum(() => 4);
      setPlusImageNum(() => productImageLength - 4);
    }
    if (currentWindowWidth >= 640) {
      setVisibleImageNum(() => 5);
      setPlusImageNum(() => productImageLength - 5);
      return;
    }
  };

  const setVisibleImages = () => {
    if (productImages.length <= visibleImageNum) {
      setVisibleImageList(() => productImages);
      console.log("visibleImages first", productImages);
      return;
    }

    const visibleImages = productImages.filter(
      (_, index) => index + 1 <= visibleImageNum
    );
    setVisibleImageList(() => visibleImages);

    console.log("visibleImages second", visibleImages);
  };

  useEffect(() => {
    visibleImageNumHandler();
    setVisibleImages();
  }, [currentWindowWidth]);

  useEffect(() => {
    visibleImageNumHandler();
    setVisibleImages();
  }, [setVisibleImages]);

  const showPlusImages: boolean = plusImageNum > 0;
  const isLastVisibleImageIndex = (index: number): boolean => {
    return index === visibleImageList.length - 1;
  };

  const nextImageHandler = () => {
    if (imageIndex >= productImages.length - 1) return;
    setImageIndex(() => imageIndex + 1);
  };

  const prevImageHandler = () => {
    if (imageIndex <= 0) return;
    setImageIndex(() => imageIndex - 1);
  };

  return (
    <Fragment>
      <div className="space-y-4 bg-gray-50">
        {isLoading && (
          <div
            className="grid place-items-center w-full h-[50vh] bg-gray-200
                border-t-[6px] border-primary"
          >
            <Spinner className="w-12 h-12" />
          </div>
        )}
        <div className="space-y-2">
          <div className="w-full relative border-t-[6px] border-primary">
            <img
              src={productImages[imageIndex]?.imageUrl}
              alt=""
              className="w-full h-full aspect-[4/3]"
            />
            <svg
              className="w-8 h-8 fill-gray-100 cursor-pointer rotate-[-90deg]
              absolute right-1 top-[45%]"
              onClick={() => nextImageHandler()}
            >
              <use href={`${sprite}#icon-chevron-down`}></use>
            </svg>
            <svg
              className="w-8 h-8 fill-gray-100 cursor-pointer rotate-[90deg]
              absolute left-1 top-[45%]"
              onClick={() => prevImageHandler()}
            >
              <use href={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </div>
          <div className="flex items-center gap-x-2">
            {visibleImageList.map((image: any, index: number) => {
              if (showPlusImages && isLastVisibleImageIndex(index)) {
                return (
                  <div key={index} className="w-24 h-20 relative">
                    <img
                      src={image?.imageUrl}
                      className="w-full h-full aspect-[4/3] brightness-50
                       transition-all"
                      alt=""
                    />
                    <div
                      className="w-full h-full absolute top-0 bottom-0 left-0 right-0
                          flex flex-col items-center justify-center text-gray-100"
                    >
                      <p className="flex items-center justify-center">
                        <svg className="w-4 h-4 fill-gray-100">
                          <use href={`${sprite}#icon-plus-small`}></use>
                        </svg>
                        <span className="text-2xl">{plusImageNum}</span>
                      </p>
                      <p className="text-sm -mt-2">
                        <span>images</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div key={index} className="w-24 h-20">
                  <img
                    src={image?.imageUrl}
                    className="w-full h-full aspect-[4/3]"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <span className="text-gray-600 text-xl font-semibold">
            {productDetails?.productName}
          </span>
          <svg className="w-5 h-5 fill-gray-600">
            <use href={`${sprite}#icon-bookmark`}></use>
          </svg>
        </div>
        <div className="flex items-center justify-between  px-4">
          <div className="flex items-center gap-x-1 text-gray-600 text-sm">
            <svg className="w-4 h-4 fill-gray-600">
              <use href={`${sprite}#icon-clock`}></use>
            </svg>
            <span>Posted</span>
            <span>{elapsedTime(productDetails?.createdAt)}</span>
          </div>
          <div className="flex items-center gap-x-1 text-gray-600 text-sm">
            <svg className="w-5 h-5 fill-gray-600">
              <use href={`${sprite}#icon-eye-filled`}></use>
            </svg>
            <span>{250}</span>
            <span>views</span>
          </div>
        </div>
        <div className="border-t-[1px] border-gray-opacity p-4">
          <ProductDetailedView
            productDetailedInfo={productDetails?.ProductDetailedInfo}
          />
        </div>
        <div className="border-t-[1px] border-gray-opacity p-4 space-y-3">
          <p className="text-sm text-gray-700">{productDetails?.description}</p>
          <Button>start chat</Button>
        </div>
      </div>
    </Fragment>
  );
};
