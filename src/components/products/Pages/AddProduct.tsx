import React, { Fragment } from "react";
import { PageLayoutDynamic } from "../../shared/layouts/PageLayoutDynamic";
import { AddProductLayout } from "../layout/AddProductLayout";

export const AddProduct: React.FC = () => {
  return (
    <Fragment>
      <PageLayoutDynamic>
        <AddProductLayout />
      </PageLayoutDynamic>
    </Fragment>
  );
};
