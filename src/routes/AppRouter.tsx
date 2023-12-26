import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { authenticate } from "../store/actions/auth";
import { notificationActions } from "../store";
import { Home } from "../components/common/pages/Home";
import { Notification } from "../components/shared/UI/Notification";
import { socketUrl } from "../store";
import { TAuthState, TAuth } from "../types/auth";
import { TNotificationState } from "../types/notification";
import { useReAuthenticate } from "../hooks/useReAuthenticate";
import { Settings } from "../components/common/pages/Settings";
import { Chat } from "../components/chat/pages/Chat";
import { SavedProducts } from "../components/products/Pages/SavedProducts";
import { UserNotifications } from "../components/user-notifications/pages/UserNotifications";
import { Live } from "../components/live-video/Pages/Live";
import { Profile } from "../components/Profile/pages/Profile";
import { MyShop } from "../components/products/Pages/MyShop";
import { AddProduct } from "../components/products/Pages/AddProduct";
import { ProductPage } from "../components/products/Pages/ProductPage";
import { useLiveNotification } from "../hooks/useLiveNotification";

export const AppRouter: React.FC = () => {
  const auth = useSelector((state: TAuthState) => state.auth);
  const isLoggedIn = auth.isLoggedIn;
  const socket: Socket = io(socketUrl);

  const { reAuthenticate } = useReAuthenticate();

  const dispatch: any = useDispatch();

  const notification = useSelector(
    (state: TNotificationState) => state.notification
  );

  const closeCardHandler = () => {
    dispatch(notificationActions.hideCardNotification());
  };

  useLiveNotification();

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
      dispatch(notificationActions.hideAlert());
    }, 4000);
  }, [dispatch]);

  useEffect(() => {
    const tryLogin = async () => {
      const strAuthData = localStorage.getItem("auth");
      const parsedAuthData: TAuth = strAuthData && JSON.parse(strAuthData);

      if (!parsedAuthData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, accessToken, expirationTime, refreshToken } =
        parsedAuthData;

      if (!user || !accessToken) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      if (refreshToken) {
        const isReAuthenticated = reAuthenticate();
        if (isReAuthenticated) return;
      }

      const expiryTime = new Date(expirationTime);
      const currentTime = new Date(Date.now());
      const isExpired = expiryTime < currentTime;

      if (isExpired) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      dispatch(authenticate(parsedAuthData));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="text-base overflow-x-hidden bg-gray-100">
        <BrowserRouter>
          {!isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Fragment>
          )}

          {isLoggedIn && (
            <>
              <Chat socket={socket} />
              <Fragment>
                {notification.showCardNotification && (
                  <Notification
                    type={notification.cardNotificationType}
                    message={notification.cardMessage}
                    onClose={closeCardHandler}
                  />
                )}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/saved-adverts" element={<SavedProducts />} />
                  <Route
                    path="/notifications"
                    element={<UserNotifications />}
                  />
                  <Route path="/live" element={<Live />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/my-shop" element={<MyShop />} />
                  <Route
                    path="/ad/:productName/:sellerId"
                    element={<ProductPage />}
                  />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/home" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Fragment>
            </>
          )}
        </BrowserRouter>
      </div>
    </Fragment>
  );
};
