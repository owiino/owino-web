import React, { Fragment } from "react";
import personPlaceHolder from "../../../assets/images/logo.png";

export const PersonPlaceHolder: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-0 h-0 sm:w-2/5 sm:h-full bg-primary  sm:flex items-center 
            justify-center absolute top-0 right-0 z-0 rounded-br-lg rounded-tr-lg"
      >
        <div className="relative">
          <div
            className="w-0 h-0 sm:w-48 sm:h-48 sm:border-[38px] border-primary rounded-[50%]
                 absolute"
          ></div>
          <div className="w-0 h-0 sm:w-48 sm:h-48 flex items-center justify-center">
            <img
              src={personPlaceHolder}
              alt="person-placeholder"
              className="w-0 h-0 sm:w-32 sm:h-32"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
