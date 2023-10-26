import React, { Fragment } from "react";
import { LiveVideoRecorder } from "./LiveVideoRecorder";

export const GoLive: React.FC = () => {
  return (
    <Fragment>
      <div>
        <h1>GoLive</h1>
        <LiveVideoRecorder />
      </div>
    </Fragment>
  );
};
