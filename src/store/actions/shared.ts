import { sharedActions } from "../index";

export const updateAppWidth = (width: number) => {
  return async (dispatch: any) => {
    await dispatch(sharedActions.updateWidth({ currentWindowWidth: width }));
  };
};

export const clearWidth = () => {
  return async (dispatch: any) => {
    await dispatch(sharedActions.clearWidth());
  };
};
