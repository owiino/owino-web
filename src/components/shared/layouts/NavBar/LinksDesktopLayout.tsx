import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import sprite from "../../../../assets/icons/sprite.svg";
import { useSelector, useDispatch } from "react-redux";
import { AuthLayout } from "../../../auth/layouts/AuthLayout";
import { NavDropDown } from "../../UI/NavDropDown";
import { showChatRecipientList } from "../../../../store/actions/chat";
import {
  TLiveNotificationState,
  TLiveNotification,
} from "../../../../types/liveNotification";

export const LinksDesktopLayout: React.FC = () => {
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.auth.isLoggedIn
  );
  const user = useSelector((state: any) => state.auth.user);
  const dispatch: any = useDispatch();
  const notifications: TLiveNotification[] = useSelector(
    (state: TLiveNotificationState) => state.liveNotification.notifications
  );
  const [notificationCount, setNotificationCount] = useState<number | string>(
    notifications?.length
  );

  const showChatRecipientListHandler = () => {
    dispatch(showChatRecipientList());
  };

  useEffect(() => {
    const notificationCountStrBuilder = () => {
      const notifCount: number = notifications?.length;
      if (notifCount > 9 && notifCount < 99) {
        setNotificationCount(() => "9+");
        return;
      }
      if (notifCount > 99) {
        setNotificationCount(() => "99+");
        return;
      }
      setNotificationCount(() => notifCount);
    };

    notificationCountStrBuilder();
  }, [notifications]);

  return (
    <Fragment>
      <nav>
        {isLoggedIn && (
          <ul className="flex justify-center items-center space-x-2">
            <li className="w-full">
              <NavLink
                to="/saved-adverts"
                className="flex items-center gap-x-2"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-bookmark-filled`}></use>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li className="w-full relative">
              <NavLink
                to="/notifications"
                className="flex items-center gap-x-2"
              >
                <span
                  className="absolute -top-4 -right-1 text-[12px] 
                  font-semibold text-gray-50 bg-red-700 rounded-[50%] 
                  grid place-items-center min-w-6 min-h-6 px-1
                  animate-opacityZeroToFull"
                  key={notificationCount}
                >
                  {notificationCount}
                </span>
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600 ">
                    <use href={`${sprite}#icon-notification-filled`}></use>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="#"
                className="flex items-center gap-x-2"
                onClick={() => showChatRecipientListHandler()}
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600 ">
                    <use href={`${sprite}#icon-chat-filled`}></use>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink to="/live" className="flex items-center gap-x-2">
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-video-call`}></use>
                  </svg>
                </span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavDropDown>
                <NavLink to="#" className="flex items-center gap-x-2">
                  {!user.imageUrl && (
                    <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                      <svg className="w-5 h-5 fill-gray-600">
                        <use href={`${sprite}#icon-person-filled`}></use>
                      </svg>
                    </span>
                  )}
                  {user.imageUrl && (
                    <div className="bg-gray-300 w-8 h-8 grid place-items-center rounded-[50%]">
                      <img
                        src={user.imageUrl}
                        alt={user.firstName}
                        className="w-full h-full rounded-[50%]"
                      />
                    </div>
                  )}
                </NavLink>
              </NavDropDown>
            </li>
          </ul>
        )}
        {!isLoggedIn && (
          <ul className="flex justify-center items-center space-x-2 text-gray-200">
            <li>
              <AuthLayout label="logIn" />
            </li>
            <li>
              <AuthLayout label="register" />
            </li>
          </ul>
        )}
      </nav>
    </Fragment>
  );
};
