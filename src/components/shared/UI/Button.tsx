import React, { ReactNode, MouseEvent, Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Fragment>
      <button
        className={twMerge(
          "h-9 bg-primary text-gray-light-1 rounded px-3",
          props.className
        )}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled || false}
      >
        {props.children}
      </button>
    </Fragment>
  );
};
