import React from "react";
import { PageLayout } from "../../shared/layouts/PageLayout";
import { ChangePassword } from "../../auth/UI/ChangePassword";
import { TPageLink } from "../../../types/page";

export const Settings: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Change password",
      linkValue: "change-password",
      linkComponent: <ChangePassword />,
    },
  ];

  return <PageLayout pageIcon="" pageLabel="Settings" pageLinks={pageLinks} />;
};
