import React, { Fragment } from "react";
import { ModerationMessage } from "./ModerationMessage";

export const Moderation: React.FC = () => {
  const message = [1, 2, 3, 4, 5];
  // TODO: To be changed actual message types"
  // TODO: To be changed actual message types"
  return (
    <Fragment>
      <div className="space-y-4">
        {message.map((_, index) => {
          return (
            <div key={index}>
              <ModerationMessage />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

// AIzaSyCxcExxoxxxyJis2HMUt5aNufc_wlsOHr0 //Map api key
