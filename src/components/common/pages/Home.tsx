import React, { Fragment } from "react";
import { Header } from "../../shared/layouts/Header";
import { ProductContentLayout } from "../../products/layout/ProductContentLayout";

export const Home: React.FC = () => {
  return (
    <Fragment>
      <div
        className="min-h-[100vh] bg-gradient-to-tl from-purple-100
           via-gray-200 to-blue-50"
      >
        <Header />
        <ProductContentLayout />
      </div>
    </Fragment>
  );
};
