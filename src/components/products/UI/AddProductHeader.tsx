import React, { Fragment, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface AddProductHeaderProps {
  className?: string;
  customHeaderElement?: ReactNode;
  onClickBack?: (value: boolean) => void;
  onClickClear?: (value: boolean) => void;
}

export const AddProductHeader: React.FC<AddProductHeaderProps> = (props) => {
  // TODO: clear post handler here

  const clickBackHandler = () => {
    props.onClickBack && props.onClickBack(true);
  };
  const clickClearHandler = () => {
    props.onClickClear && props.onClickClear(true);
  };

  return (
    <Fragment>
      <div
        className={twMerge(
          `bg-gray-50 w-[90%] xs:w-[448px] rounded-md p-4 flex items-center 
              justify-between`,
          props.className
        )}
      >
        {/* TODO: To add svg icon for the empty span */}
        <span onClick={() => clickBackHandler()}>
          {props.customHeaderElement}
        </span>
        <span className="text-gray-700">Post Ad</span>
        <span className="text-primary" onClick={() => clickClearHandler()}>
          clear
        </span>
      </div>
    </Fragment>
  );
};
