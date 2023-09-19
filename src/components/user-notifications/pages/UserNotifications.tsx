import React, { Fragment } from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
import { UserNotificationsList } from "../UI/UserNotificationsList";
import { TPageLink } from "../../../types/page";

export const UserNotifications: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Notifications",
      linkValue: "notifications#notifications",
      linkComponent: <UserNotificationsList />,
    },
  ];
  return (
    <Fragment>
      <PageLayoutClassic
        pageIcon="notification-filled"
        pageLabel="Notifications"
        pageLinks={pageLinks}
      />
    </Fragment>
  );
};
