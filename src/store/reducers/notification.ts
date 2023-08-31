import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNotification, TNotificationPayload } from "../../types/notification";

const initialState: TNotification = {
  showAlert: false,
  alertType: null,
  alertMessage: null,
  showCardNotification: false,
  cardNotificationType: null,
  cardMessage: null,
  cardNotificationTitle: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showAlert(state, action: PayloadAction<TNotificationPayload>) {
      state.showAlert = true;
      state.alertType = action.payload.type;
      state.alertMessage = action.payload.message;
    },
    hideAlert(state) {
      state.showAlert = false;
      state.alertType = null;
      state.alertMessage = null;
    },
    showCardNotification(state, action: PayloadAction<TNotificationPayload>) {
      state.showCardNotification = true;
      state.cardNotificationType = action.payload.type;
      state.cardMessage = action.payload.message;
    },
    hideCardNotification(state) {
      state.showCardNotification = false;
      state.cardNotificationType = null;
      state.cardMessage = null;
    },
  },
});

export const {
  showAlert,
  hideAlert,
  showCardNotification,
  hideCardNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
