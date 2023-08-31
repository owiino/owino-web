import React, { MouseEvent, Fragment } from "react";
import sprite from "../../assets/icons/sprite.svg";
import { twMerge } from "tailwind-merge";

interface IconButtonProps {
  className?: string;
  iconClass?: string;
  icon: string;
  label: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return (
    <Fragment>
      <button
        className={twMerge(
          `flex justify-center items-center 
           w-full h-9 bg-primary text-gray-light-1 rounded px-4 gap-x-4`,
          props.className
        )}
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
      >
        <svg className={`${props.iconClass}`}>
          <use href={`${sprite}#icon-${props.icon}`}></use>
        </svg>
        <span>{props.label}</span>
      </button>
    </Fragment>
  );
};
