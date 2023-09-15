import React, { Fragment } from "react";
import logo from "../../../../assets/images/logo.png";

export const Logo: React.FC = () => {
  return (
    <Fragment>
      <div>
        <img
          src={logo}
          alt="logo"
          className="w-16 h-12 bg-primary text-primary"
        />
      </div>
    </Fragment>
  );
};
