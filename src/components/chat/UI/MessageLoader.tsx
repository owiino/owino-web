import React, { Fragment } from "react";
import { Spinner } from "../../shared/UI/Loader/Spinner";

export const MessageLoader: React.FC = () => {
  return (
    <Fragment>
      <div
        className="bg-primary w-8 h-8 p-5 flex items-center 
            justify-center rounded-[50%] absolute left-[43%] top-[29%]
            z-[20]"
      >
        <Spinner className="before:-left-3" />
      </div>
    </Fragment>
  );
};
