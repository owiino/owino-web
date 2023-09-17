import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import electronics from "../../../assets/images/electronics.png";

export const ProductCategories: React.FC = () => {
  const productCategories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Fragment>
      <div
        className="lg:rounded lg:shadow-md w-full sm:w-72 p-2 lg:border-[1px]
        border-gray-300"
      >
        <ul className="space-4 lg:space-y-1">
          {productCategories.map((_, index) => {
            return (
              <li key={index} className="w-full ">
                <Link
                  to="#"
                  className="w-full flex  items-center justify-between lg:gap-x-2"
                >
                  <div
                    className="flex flex-col lg:flex-row items-center justify-center 
                       gap-x-2 bg-gray-50"
                  >
                    <img
                      src={electronics}
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
