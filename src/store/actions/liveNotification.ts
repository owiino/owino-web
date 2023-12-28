import { liveNotificationActions } from "../index";
import { TLiveNotification } from "../../types/liveNotification";

export const updateLiveNotification = ({
  userId,
  message,
}: TLiveNotification) => {
  return (dispatch: any) => {
    dispatch(
      liveNotificationActions.updateLiveNotifications({
        userId: userId,
        message: message,
      })
    );
  };
};

export const clearLiveNotifications = () => {
  return (dispatch: any) => {
    dispatch(liveNotificationActions.clearLiveNotifications());
  };
};
