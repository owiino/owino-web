import React, { Fragment } from "react";

export const AddProductHeader: React.FC = () => {
  // TODO: clear post handler here
  return (
    <Fragment>
      <div
        className="bg-gray-50 w-[90%] xs:w-[448px] rounded-md p-4 flex items-center 
            justify-between"
      >
        {/* TODO: To add svg icon for the empty span */}
        <span> </span>
        <span className="text-gray-700">Post Ad</span>
        <span className="text-primary">clear</span>
      </div>
    </Fragment>
  );
};
