import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { notificationSlice } from "./reducers/notification";
import { liveNotificationSlice } from "./reducers/liveNotification";
import { chatSlice } from "./reducers/chat";
import { sharedSlice } from "./reducers/shared";
import { productSlice } from "./reducers/product";
import { userSlice } from "./reducers/user";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    liveNotification: liveNotificationSlice.reducer,
    chat: chatSlice.reducer,
    shared: sharedSlice.reducer,
    product: productSlice.reducer,
    user: userSlice.reducer,
  },
});

let url: string, socketUrl: string, goUrl: string, goSocketUrl: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8000/api/v1";
  socketUrl = "http://localhost:8000";
  goUrl = "http://localhost:8080/go/api/v1";
  goSocketUrl = "http://localhost:8080/";
} else {
  url = "https://owino-backend.onrender.com/api/v1";
  socketUrl = "https://owino-backend.onrender.com";
  goUrl = "https://owino-backend-go.onrender.com/go/api/v1";
  goSocketUrl = "https://owino-backend-go.onrender.com/";
}

export { url, socketUrl, goUrl, goSocketUrl };
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
export const liveNotificationActions = liveNotificationSlice.actions;
export const chatActions = chatSlice.actions;
export const sharedActions = sharedSlice.actions;
export const productActions = productSlice.actions;
export const userActions = userSlice.actions;
