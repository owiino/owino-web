import React, { Fragment } from "react";
import sprite from "../../../../assets/icons/sprite.svg";
import { Link } from "react-router-dom";

export const HeaderContent: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-full flex flex-col gap-y-8 sm:gap-y-0 sm:flex-row 
         sm:items-center sm:justify-center sm:gap-x-8 lg:gap-x-16 px-8
         py-16 text-gray-200 bg-gradient-to-tr from-primary-dark
        via-primary to-primary-light transition-all"
      >
        <div
          className="flex flex-col items-center justify-center rounded-md
           p-4 gap-4 shadow-2xl bg-gradient-to-tr from-primary
           via-primary-light to-primary-dark"
        >
          <span className="text-center">Sell your products live</span>
          <span className="bg-gray-200 p-2 grid place-items-center rounded-[50%]">
            <svg className="w-5 h-5 fill-primary-light">
              <use href={`${sprite}#icon-video-call`}></use>
            </svg>
          </span>
          <span>Go live</span>
        </div>
        <div
          className="flex flex-col items-center justify-center rounded-md
            p-4 gap-4 shadow-2xl bg-gradient-to-tr from-primary
            via-primary-light to-primary-dark"
        >
          <span className="text-center">How to buy on owino.com</span>
          <span className="bg-gray-200 p-2 grid place-items-center rounded-[50%]">
            <svg className="w-5 h-5 fill-primary-light">
              <use href={`${sprite}#icon-bookmark-filled`}></use>
            </svg>
          </span>
          <span>
            <Link to="#">click to learn more</Link>
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center rounded-md
            p-4 gap-4 shadow-2xl bg-gradient-to-tr from-primary
            via-primary-light to-primary-dark"
        >
          <span className="text-center">Got something to sell</span>
          <span className="bg-gray-200 p-2 grid place-items-center rounded-[50%]">
            <svg className="w-5 h-5 fill-primary-light">
              <use href={`${sprite}#icon-plus`}></use>
            </svg>
          </span>
          <span>Post an advert</span>
        </div>
      </div>
    </Fragment>
  );
};
