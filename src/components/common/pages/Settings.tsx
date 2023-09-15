import React from "react";
import { PageLayout } from "../../shared/layouts/PageLayout";
import { EditPersonalDetails } from "../../auth/UI/EditPersonalDetails";
import { ChangePassword } from "../../auth/UI/ChangePassword";
import { ChangePhoneNumber } from "../../auth/UI/ChangePhoneNumber";
import { TPageLink } from "../../../types/page";

export const Settings: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Personal Details",
      linkValue: "edit-personal-details",
      linkComponent: <EditPersonalDetails />,
    },
    {
      linkName: "Change password",
      linkValue: "change-password",
      linkComponent: <ChangePassword />,
    },
    {
      linkName: "Change phone number",
      linkValue: "change-phone-number",
      linkComponent: <ChangePhoneNumber />,
    },
  ];

  return (
    <PageLayout
      pageIcon="settings"
      pageLabel="Settings"
      pageLinks={pageLinks}
    />
  );
};
