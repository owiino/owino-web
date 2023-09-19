import React from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
import { EditPersonalDetails } from "../../auth/UI/EditPersonalDetails";
import { ChangePassword } from "../../auth/UI/ChangePassword";
import { ChangePhoneNumber } from "../../auth/UI/ChangePhoneNumber";
import { TPageLink } from "../../../types/page";

export const Settings: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Personal Details",
      linkValue: "settings#edit-personal-details",
      linkComponent: <EditPersonalDetails />,
    },
    {
      linkName: "Change password",
      linkValue: "settings#change-password",
      linkComponent: <ChangePassword />,
    },
    {
      linkName: "Change phone number",
      linkValue: "settings#change-phone-number",
      linkComponent: <ChangePhoneNumber />,
    },
  ];

  return (
    <PageLayoutClassic
      pageIcon="settings"
      pageLabel="Settings"
      pageLinks={pageLinks}
    />
  );
};
