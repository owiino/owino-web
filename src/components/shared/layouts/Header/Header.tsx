import React, { Fragment } from "react";
import { NavBar } from "../NavBar";
import { HeaderContent } from "./HeaderContent";

export const Header: React.FC = () => {
  return (
    <Fragment>
      <header className="">
        <NavBar />
        <HeaderContent />
      </header>
    </Fragment>
  );
};
