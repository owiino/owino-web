import React, { Fragment, ReactNode } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface PageLayoutDynamicProps {
  children: ReactNode;
}

export const PageLayoutDynamic: React.FC<PageLayoutDynamicProps> = (props) => {
  return (
    <Fragment>
      <div
        className="space-y-8 min-h-[100vh] h-auto relative
           pt-10 bg-gradient-to-tl from-purple-100
           via-gray-100 to-blue-50"
      >
        <NavBar />
        <section>{props.children}</section>
        <Footer />
      </div>
    </Fragment>
  );
};
