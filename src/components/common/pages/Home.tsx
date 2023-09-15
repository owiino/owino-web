import React, { Fragment } from "react";
import { NavBar } from "../../shared/layouts/NavBar";

export const Home: React.FC = () => {
  return (
    <Fragment>
      <div className="min-h-[100vh]">
        <header className="text-gray-light-2">
          <NavBar />
          <div className="bg-gray-light-2 h-[70vh]"></div>
        </header>
      </div>
    </Fragment>
  );
};
