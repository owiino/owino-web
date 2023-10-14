import React, { Fragment, useState } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { IconButton } from "../../shared/UI/IconButton";
import { TGetProduct } from "../../../types/product";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  hideCardNotification,
  showCardNotification,
} from "../../../store/actions/notification";
import { getUser } from "../../../API/user";
import { Spinner } from "../../shared/UI/Loader";
import { elapsedTime } from "../../../utils";

export const SellerProfile: React.FC = () => {
  const [sellerProfileData, setSellerProfileData] = useState<any>(null);
  const productOnPage: TGetProduct = useSelector(
    (state: any) => state.product.currentProductOnPage
  );
  const dispatch: any = useDispatch();

  const { isLoading } = useQuery(
    [`seller-${productOnPage.sellerId}`],
    () => {
      return getUser(productOnPage.sellerId);
    },
    {
      onSuccess: (data: any) => {
        setSellerProfileData(() => data.data.user);
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

  const showImage = sellerProfileData?.imageUrl;
  const sellerName = `${sellerProfileData?.firstName} ${sellerProfileData?.lastName}`;
  const createdAt: string = sellerProfileData?.createdAt;
  const lastSeenAt: string = sellerProfileData?.Tokens[0].createdAt;

  return (
    <Fragment>
      <div
        className="bg-gray-50 p-4 space-y-4 text-gray-800
            w-full"
      >
        {isLoading && (
          <div>
            <Spinner />
          </div>
        )}
        <div className="flex items-start gap-x-4">
          <div
            className="bg-gray-300 flex items-center justify-center 
            w-12 min-w-[48px] h-12 min-h-[48px] rounded-[50%] relative"
          >
            {showImage && (
              <img
                src={sellerProfileData?.imageUrl}
                alt={sellerName}
                className="w-full  h-full rounded-[50%]"
              />
            )}
            {!showImage && (
              <svg className="w-7 h-7 fill-gray-dark-1">
                <use href={`${sprite}#icon-person-filled`}></use>
              </svg>
            )}
            {/* TODO: To dynamically change the color od the dot depending 
              on users online status(active[fill-green-600], active-5min-ago[fill-yellow-600] 
              active-beyond-5min[fill-gray-500])  */}
            <svg className="w-6 h-6 fill-green-600 absolute -right-[9px] bottom-0">
              <use href={`${sprite}#icon-dot`}></use>
            </svg>
          </div>
          <div className="space-y-1">
            <span className="font-bold">{sellerName}</span>
            <div className="flex sm:flex-cols items-start gap-2">
              <span
                className="bg-gray-300 text-gray-800 text-[12px] rounded
                 p-2 leading-3"
              >
                Last seen {elapsedTime(lastSeenAt)}
              </span>
              <span
                className="bg-gray-300 text-gray-800 text-[12px] rounded
                 p-2 leading-3"
              >
                Joined {elapsedTime(createdAt)} ago
              </span>
            </div>
          </div>
        </div>
        <IconButton
          type="button"
          icon="chat-filled"
          label="Start chat"
          iconClass="fill-gray-100 w-6 h-6"
        />
      </div>
    </Fragment>
  );
};
