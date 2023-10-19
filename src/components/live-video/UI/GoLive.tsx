import React, { Fragment } from "react";
import { FLVideoPlayer } from "./FLVideoPlayer";

export const GoLive: React.FC = () => {
  return (
    <Fragment>
      <div>
        <h1>GoLive</h1>
        <FLVideoPlayer />
      </div>
    </Fragment>
  );
};
