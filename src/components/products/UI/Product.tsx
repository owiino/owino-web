import React, { Fragment, useState } from "react";
import { addCommasToNumber } from "../../../utils/addComasToNumber";
import sprite from "../../../assets/icons/sprite.svg";
import phone from "../../../assets/images/phone.png";

interface ProductProps {
  saved: boolean;
  onSave: (isSaved: boolean) => void;
}

export const Product: React.FC<ProductProps> = (props) => {
  const [productSaved, setProductSaved] = useState(props.saved);

  const onSaveHandler = () => {
    props.onSave(productSaved);
  };

  //   TODO: product saving api here

  return (
    <Fragment>
      <div
        className="flex flex-col items-center justify-center
         shadow-md rounded mt-4"
      >
        <div
          className="h-32 w-full bg-gray-400 rounded-t
           rounded-trs"
        >
          <img
            src={phone}
            alt="product image"
            className="w-full h-full rounded-t"
          />
        </div>
        <div
          className="flex flex-col items-start justify-center relative
           w-full pt-4 p-2 text-sm"
        >
          <span>Sumsung S4 plus teal</span>
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
      </div>
    </Fragment>
  );
};
