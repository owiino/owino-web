import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import sprite from "../../../assets/icons/sprite.svg";
import electronics from "../../../assets/images/electronics.png";
import categories from "../../../data/productCategories.json";

export const ProductCategories: React.FC = () => {
  console.log("categories", categories);
  const productCategories = categories.categories;

  const categoriesStylesDesktop = `lg:bg-gray-200 lg:flex-row lg:items-center lg:justify-start lg:p-1
                                   aspect-none lg:gap-x-2  lg:h-10 lg:w-full`;
  const categoriesStylesMobile = `flex flex-col items-center justify-center p-4 aspect-[4/4]`;

  return (
    <Fragment>
      <div
        className="lg:rounded lg:shadow-md w-full lg:w-72 lg:border-[1px]
        border-gray-300 lg:p-2"
      >
        <ul
          className="grid grid-cols-3 xs:grid-cols-5 sm:grid-cols-5 grid-rows-auto 
           gap-[2px] lg:flex flex-col lg:gap-0 w-full"
        >
          {productCategories.map((category, index) => {
            return (
              <li key={index} className="w-full bg-gray-50 lg:bg-gray-100 ">
                <Link to="#">
                  <div
                    className={`${categoriesStylesMobile} ${categoriesStylesDesktop}`}
                  >
                    <img
                      src={electronics}
                      alt={"category name"}
                      className="w-12 h-auto bg-gray-500 aspect-[4/3]"
                    />
                    <span className="text-center text-sm lg:text-base">
                      {category.name}
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
