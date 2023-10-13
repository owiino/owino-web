import React, { Fragment, useState } from "react";
import { addCommasToNumber } from "../../../utils/addComasToNumber";
import sprite from "../../../assets/icons/sprite.svg";
// import phone from "../../../assets/images/phone.png";
import { TGetProduct } from "../../../types/product";
import { Link, useNavigate } from "react-router-dom";
import { fillStringWithHyphen } from "../../../utils";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentProductOnPage } from "../../../store/actions/product";

interface ProductProps {
  saved: boolean;
  productData: TGetProduct;
  onSave: (isSaved: boolean) => void;
}

export const Product: React.FC<ProductProps> = (props) => {
  const [productSaved, setProductSaved] = useState(props.saved);
  const productData = props.productData;
  const productImageUrl: string = productData.productImages[0].imageUrl;

  const dispatch: any = useDispatch();

  const navigate = useNavigate();

  const onSaveHandler = () => {
    props.onSave(productSaved);
  };

  const urlProductName = fillStringWithHyphen(productData.productName);
  const urlSellerId = productData.sellerId.toString();

  const updateProductOnCurrentPage = () => {
    dispatch(updateCurrentProductOnPage(productData));
    navigate(`/ad/${urlProductName}/${urlSellerId}`);
  };

  //   TODO: product saving api here

  return (
    <Fragment>
      <div
        className="flex flex-col items-center justify-center
         shadow-md rounded mt-4"
      >
        {/* <Link to={`/ad/${urlProductName}/${urlSellerId}`}> */}
        <div
          className="h-auto w-full bg-gray-400 rounded-t"
          onClick={() => updateProductOnCurrentPage()}
        >
          <img
            // src={phone}
            src={productImageUrl}
            alt="product image"
            className="w-full  rounded-t aspect-[4/3]"
          />
        </div>
        <div
          className="flex flex-col items-start justify-center relative
           w-full pt-4 p-2 text-sm"
        >
          {/* <span>Sumsung S4 plus teal</span> */}
          <span>{productData.productName}</span>
          <span className="text-primary-dark">
            UGX {addCommasToNumber(520000)}
          </span>
          <span
            className="bg-gray-100 p-1 grid place-items-center
             rounded-[50%] absolute -top-3 right-2 shadow"
          >
            {props.saved && (
              <svg
                className="w-5 h-5 fill-primary"
                onClick={() => {
                  setProductSaved((productSaved) => !productSaved),
                    onSaveHandler();
                }}
              >
                <use href={`${sprite}#icon-bookmark-filled`}></use>
              </svg>
            )}
            {!props.saved && (
              <svg
                className="w-5 h-5 fill-primary"
                onClick={() => {
                  setProductSaved((productSaved) => !productSaved),
                    onSaveHandler();
                }}
              >
                <use href={`${sprite}#icon-bookmark`}></use>
              </svg>
            )}
          </span>
        </div>
        {/* </Link> */}
      </div>
    </Fragment>
  );
};
