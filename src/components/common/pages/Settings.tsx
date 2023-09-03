import React from "react";
import { PageLayout } from "../../shared/layouts/PageLayout";
import { ChangePassword } from "../../auth/UI/ChangePassword";
import { ChangePhoneNumber } from "../../auth/UI/ChangePhoneNumber";
import { TPageLink } from "../../../types/page";

export const Settings: React.FC = () => {
  const pageLinks: TPageLink[] = [
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

  return <PageLayout pageIcon="" pageLabel="Settings" pageLinks={pageLinks} />;
};
