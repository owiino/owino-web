import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";
import { chatSlice } from "./reducers/chat";
import { sharedSlice } from "./reducers/shared";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    chat: chatSlice.reducer,
    shared: sharedSlice.reducer,
  },
});

let url: string, socketUrl: string, goUrl: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
  socketUrl = "http://localhost:8000";
  goUrl = "http://localhost:8080/go/api/v1";
} else {
  url = "https://owino-backend.onrender.com/api/v1";
  socketUrl = "https://owino-backend.onrender.com";
  goUrl = "https://owino-backend-go.onrender.com/go/api/v1";
}

export { url, socketUrl, goUrl };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const chatActions = chatSlice.actions;
export const sharedActions = sharedSlice.actions;
