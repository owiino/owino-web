import React, { Fragment, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <Fragment>
      <div className={twMerge("p-3 shadow-lg rounded-xl", props.className)}>
        {props.children}
      </div>
    </Fragment>
  );
};
