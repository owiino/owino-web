import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TLiveNotification,
  TLiveNotificationState,
} from "../../types/liveNotification";

const initialState: TLiveNotificationState = {
  notifications: [],
};

export const liveNotificationSlice = createSlice({
  name: "liveNotification",
  initialState,
  reducers: {
    updateLiveNotifications(state, action: PayloadAction<TLiveNotification>) {
      console.log("action.payload", action.payload);
      state.notifications.push(action.payload);
    },
    clearLiveNotifications(state) {
      state.notifications = [];
    },
  },
});
