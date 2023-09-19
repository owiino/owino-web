import React, { Fragment } from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
import { SavedProductsList } from "../UI/SavedProductsList";
import { TPageLink } from "../../../types/page";

export const SavedProducts: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Saved adverts",
      linkValue: "saved-product-list",
      linkComponent: <SavedProductsList />,
    },
  ];

  return (
    <Fragment>
      <PageLayoutClassic
        pageIcon="bookmark-filled"
        pageLabel="Saved"
        pageLinks={pageLinks}
      />
    </Fragment>
  );
};
