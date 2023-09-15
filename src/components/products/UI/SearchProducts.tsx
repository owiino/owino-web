import React, { Fragment } from "react";
import sprite from "../../../assets/icons/sprite.svg";

export const SearchProducts: React.FC = () => {
  return (
    <Fragment>
      <form className="flex-1 w-full relative">
        <input
          type="text"
          className="w-full p-2  sm:pr-9 outline-none rounded placeholder:text-gray-600
          cursor-text-blue-500 text-gray-800"
          placeholder="Search for products"
          required
        />
        <svg className="w-5 h-5 fill-primary absolute top-[10px] right-2">
          <use href={`${sprite}#icon-search`}></use>
        </svg>
      </form>
    </Fragment>
  );
};
