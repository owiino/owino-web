import React, { Fragment } from "react";
import { Header } from "../../shared/layouts/Header";

export const Home: React.FC = () => {
  return (
    <Fragment>
      <div className="min-h-[100vh]">
        <Header />
      </div>
    </Fragment>
  );
};
