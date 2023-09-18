import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
import electronics from "../../../assets/images/electronics.png";

export const ProductCategories: React.FC = () => {
  const productCategories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const categoriesStylesDesktop = `lg:inline-block space-x-2 py-0 aspect-none`;
  const categoriesStylesMobile = `flex flex-col items-center justify-center p-4 aspect-[4/4]`;

  return (
    <Fragment>
      <div
        className="lg:rounded lg:shadow-md w-full lg:w-72 lg:border-[1px]
        border-gray-300"
      >
        <ul
          className="grid grid-cols-3 xs:grid-cols-5 sm:grid-cols-5 grid-rows-auto 
           gap-[2px] lg:block lg:space-y-1 w-full"
        >
          {productCategories.map((_, index) => {
            return (
              <li key={index} className="w-full bg-gray-50 lg:bg-gray-100 ">
                <Link to="#">
                  {/* <div
                    className="flex flex-col lg:flex-row items-center justify-center 
                       gap-x-2 bg-gray-50"
                  > */}
                  <div
                    className={`${categoriesStylesMobile} ${categoriesStylesDesktop} space-y-2`}
                  >
                    <img
                      src={electronics}
                      alt={"category name"}
                      className="w-16 h-10 bg-gray-500"
                    />
                    <span className="text-center text-sm lg:text-base">
                      Category
                    </span>
                  </div>
                  {/* <svg className="w-5 h-5 fill-gray-600 rotate-[180deg]">
                    <use href={`${sprite}#icon-chevron-left`}></use>
                  </svg> */}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};
