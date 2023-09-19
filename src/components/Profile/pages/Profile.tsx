import React, { Fragment } from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
import { MyProfile } from "../UI/MyProfile";
import { TPageLink } from "../../../types/page";

export const Profile: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Profile",
      linkValue: "profile#profile",
      linkComponent: <MyProfile />,
    },
  ];
  return (
    <Fragment>
      <PageLayoutClassic
        pageIcon="person-filled"
        pageLabel="Profile"
        pageLinks={pageLinks}
      />
    </Fragment>
  );
};
