import React, { Fragment } from "react";
import { PageLayoutClassic } from "../../shared/layouts/PageLayoutClassic";
import { GoLive } from "../UI/GoLive";
import { WatchLiveVideos } from "../UI/WatchLiveVideos";
import { TPageLink } from "../../../types/page";

export const Live: React.FC = () => {
  const pageLinks: TPageLink[] = [
    {
      linkName: "Go live",
      linkValue: "go-live",
      linkComponent: <GoLive />,
    },
    {
      linkName: "Live videos",
      linkValue: "live-videos",
      linkComponent: <WatchLiveVideos />,
    },
  ];
  return (
    <Fragment>
      <PageLayoutClassic
        pageIcon="video-call"
        pageLabel="Live"
        pageLinks={pageLinks}
      />
    </Fragment>
  );
};
