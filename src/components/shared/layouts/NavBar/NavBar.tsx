import React, { Fragment } from "react";
import { SearchProducts } from "../../../products/UI/SearchProducts";
import { Button } from "../../UI/Button";
import { Link } from "react-router-dom";
import { NavLinks } from "./NavLinks";
import { Logo } from "./Logo";

export const NavBar: React.FC = () => {
  return (
    <Fragment>
      <div
        className="bg-primary flex items-center justify-between 
            gap-x-2 md:gap-x-4 xl:gap-x-8 pl-0 p-4 py-2 transition-all
            shadow-xl border-b-[1px] border-gray-opacity fixed
            top-0 left-0 right-0 z-[100]"
      >
        <Logo />
        <SearchProducts />
        <NavLinks />
        <Button className="bg-yellow-600 text-sm md:px-8">
          <Link to="#">SELL</Link>
        </Button>
      </div>
    </Fragment>
  );
};
