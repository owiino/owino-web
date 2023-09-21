import React, { Fragment } from "react";
import logo from "../../../../assets/images/logo.png";

export const Logo: React.FC = () => {
  return (
    <Fragment>
      <div className="-mr-2 md:-mr-3 xl:-mr-2">
        <img
          src={logo}
          alt="logo"
          className="w-16 h-12 bg-primary text-primary"
        />
      </div>
    </Fragment>
  );
};
