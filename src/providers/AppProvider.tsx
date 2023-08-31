import React from "react";
import { ReduxProvider } from "./ReduxProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";

interface AppProvidersProps {
  children: JSX.Element;
}

export const AppProviders: React.FC<AppProvidersProps> = (props) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>{props.children}</ReactQueryProvider>
    </ReduxProvider>
  );
};
