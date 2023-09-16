import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";

export const ProductCategories: React.FC = () => {
  const productCategories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Fragment>
      <div
        className="rounded shadow-md w-full sm:w-72 p-2 border-[1px]
       border-gray-300 sticky top-0"
      >
        <ul>
          {productCategories.map((_, index) => {
            return (
              <li key={index} className="w-full ">
                <Link
                  to="#"
                  className="w-full flex items-center justify-between gap-x-2"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <img
                      src={"image url"}
                      alt={"category name"}
                      className="w-16 h-10 bg-gray-500"
                    />
                    <span>{"Category name"}</span>
                  </div>
                  <svg className="w-5 h-5 fill-gray-600 rotate-[180deg]">
                    <use href={`${sprite}#icon-chevron-left`}></use>
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};
