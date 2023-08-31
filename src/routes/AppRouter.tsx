import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { io, Socket } from "socket.io-client";
import { authenticate } from "../store/actions/auth";
import { notificationActions } from "../store";
import { Home } from "../components/common/pages/Home";
import { Notification } from "../components/shared/UI/Notification";
// import { socketUrl, url } from "../store";
import { TAuthState, TAuth } from "../types/auth";
import { TNotificationState } from "../types/notification";

export const AppRouter: React.FC = () => {
  const auth = useSelector((state: TAuthState) => state.auth);
  const isLoggedIn = auth.isLoggedIn;
  //   const socket = io.connect(socketUrl) as Socket;
  const dispatch: any = useDispatch();

  const notification = useSelector(
    (state: TNotificationState) => state.notification
  );

  const closeCardHandler = () => {
    dispatch(notificationActions.hideCardNotification());
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
      dispatch(notificationActions.hideAlert());
    }, 4000);
  }, [dispatch]);

  useEffect(() => {
    const tryLogin = async () => {
      // TODO: cater for freshToken here as well to avoid logout the user with valid refreshToken

      const strAuthData = localStorage.getItem("auth");
      const parsedAuthData: TAuth = strAuthData && JSON.parse(strAuthData);

      if (!parsedAuthData) {
        localStorage.clear();
        return <Navigate to="/" />;
      }

      const { user, accessToken, expirationTime } = parsedAuthData;
      if (!user || !accessToken) {
        localStorage.clear();
        return <Navigate to="/" />;
      }
      // TODO: Convert expirationTime into browser's time zone
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
      <div className="bg-gray-light-1 text-base overflow-x-hidden">
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Fragment>
          )}

          {isLoggedIn && (
            <Fragment>
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Routes>
                <Route path="/" element={<div>LoggedIn Routes Here</div>} />
              </Routes>
            </Fragment>
          )}
        </BrowserRouter>
      </div>
    </Fragment>
  );
};
