import React, { Fragment } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import { PageContentLayout } from "./PageContentLayout";
import { TPageLink } from "../../../types/page";

interface PageLayoutProps {
  pageIcon: string;
  pageLabel: string;
  pageLinks: TPageLink[];
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  return (
    <Fragment>
      <div
        className="space-y-8 min-h-[100vh] h-auto relative
           pt-10"
      >
        <NavBar />
        <PageContentLayout
          pageIcon={props.pageIcon}
          pageLabel={props.pageLabel}
          pageLinks={props.pageLinks}
        />
        <Footer />
      </div>
    </Fragment>
  );
};
