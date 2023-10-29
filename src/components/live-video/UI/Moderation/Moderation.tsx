import React, { Fragment } from "react";
import { ModerationMessage } from "./ModerationMessage";

export const Moderation: React.FC = () => {
  const message = [1, 2, 3, 4, 5];
  return (
    <Fragment>
      <div className="space-y-4">
        {message.map(() => {
          return <ModerationMessage />;
        })}
      </div>
    </Fragment>
  );
};

// AIzaSyCxcExxoxxxyJis2HMUt5aNufc_wlsOHr0 //Map api key
