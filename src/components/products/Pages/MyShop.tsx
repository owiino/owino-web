import React, { Fragment } from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
// import { SavedProductsList } from "../UI/SavedProductsList";
import { Shop } from "../UI/Shop";
import { TPageLink } from "../../../types/page";

export const MyShop: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "My shop",
      linkValue: "my-shop",
      linkComponent: <Shop />,
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
