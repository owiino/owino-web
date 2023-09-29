import React, { Fragment } from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
// import { SavedProductsList } from "../UI/SavedProductsList";
import { Shop } from "../UI/Shop";
import { TPageLink } from "../../../types/page";
import { AddProduct } from "./AddProduct";

export const MyShop: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "My shop",
      linkValue: "my-shop#",
      linkComponent: <Shop />,
    },
    {
      linkName: "Add product",
      linkValue: "add-product",
      linkComponent: <AddProduct />,
    },
  ];

  return (
    <Fragment>
      <PageLayoutClassic
        pageIcon="bookmark-filled"
        pageLabel="Shop"
        pageLinks={pageLinks}
      />
    </Fragment>
  );
};
