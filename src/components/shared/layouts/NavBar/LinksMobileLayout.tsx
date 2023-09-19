import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import sprite from "../../../../assets/icons/sprite.svg";
import { useSelector } from "react-redux";
import { AuthLayout } from "../../../auth/layouts/AuthLayout";
import { NavDropDown } from "../../UI/NavDropDown";

interface OverlayProps {
  onClose: () => void;
}

const MobileViewOVerlay: React.FC<OverlayProps> = (props) => {
  return (
    <div
      onClick={props.onClose}
      className="fixed top-16 right-0 left-0 bottom-0
      bg-gray-300 opacity-60 z-[100] cursor-pointer"
    />
  );
};

export const LinksMobileLayout: React.FC = () => {
  const [showLinks, setShowLinks] = useState(false);
  const isLoggedIn: boolean = useSelector(
    (state: any) => state.auth.isLoggedIn
  );

  return (
    <Fragment>
      <nav className="relatives">
        {showLinks && (
          <div
            className="bg-gray-100 p-2 rounded-[50%] cursor-pointer"
            onClick={() => setShowLinks(false)}
          >
            <svg className="w-6 h-6 fill-gray-800 ">
              <use href={`${sprite}#icon-cross-small`}></use>
            </svg>
          </div>
        )}
        {!showLinks && (
          <div
            className="bg-gray-100 p-2 rounded-[50%] cursor-pointer"
            onClick={() => setShowLinks(true)}
          >
            <svg className="w-6 h-6 text-gray-600 ">
              <use href={`${sprite}#icon-menu`}></use>
            </svg>
          </div>
        )}
        {isLoggedIn && showLinks && (
          <ul
            className="flex flex-col items-start justify-center sm:flex-row 
              sm:items-center sm:space-x-2 fixed top-16 right-0 left-0 sm:static
             bg-gray-100 sm:bg-primary pb-2 sm:pb-0 animate-opacityZeroToFull
              sm:animate-none shadow-md sm:shadow-none z-[200]"
          >
            <li className="w-full">
              <NavLink
                to="/saved-adverts"
                className="flex items-center gap-x-2 hover:bg-gray-300 px-4 py-2
                w-full transition-all"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-bookmark-filled`}></use>
                  </svg>
                </span>
                <span className="text-gray-800 ">Saved</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/notifications"
                className="flex items-center gap-x-2 hover:bg-gray-300 px-4 py-2
                 w-full transition-all"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600 ">
                    <use href={`${sprite}#icon-notification-filled`}></use>
                  </svg>
                </span>

                <span className="text-gray-800 ">Notifications</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="#"
                className="flex items-center gap-x-2 hover:bg-gray-300 px-4 py-2
                w-full transition-all"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600 ">
                    <use href={`${sprite}#icon-chat-filled`}></use>
                  </svg>
                </span>
                <span className="text-gray-800 ">Chat</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="/live"
                className="flex items-center gap-x-2 hover:bg-gray-300 px-4 py-2
                w-full transition-all"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600 bg-gray-100">
                    <use href={`${sprite}#icon-video-call`}></use>
                  </svg>
                </span>
                <span className="text-gray-800">Live</span>
              </NavLink>
            </li>
            <li className="w-full">
              <NavDropDown>
                <NavLink
                  to="#"
                  className="flex items-center gap-x-2 hover:bg-gray-300 px-4 py-2
                w-full transition-all"
                >
                  <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                    <svg className="w-5 h-5 fill-gray-600">
                      <use href={`${sprite}#icon-person-filled`}></use>
                    </svg>
                  </span>
                  <span className="text-gray-800">Profile</span>
                </NavLink>
              </NavDropDown>
            </li>
          </ul>
        )}
        {!isLoggedIn && showLinks && (
          <ul
            className="flex flex-col items-start justify-center 
             fixed top-16 right-0 left-0 bg-gray-100 pb-2 
             animate-opacityZeroToFull  shadow-md  z-[20]"
          >
            <li className="w-full">
              <div
                className="hover:bg-gray-300 px-4 py-2 w-full
                 transition-all text-gray-800 hover:text-primary "
              >
                <AuthLayout label="logIn" />
              </div>
            </li>
            <li className="w-full">
              <div
                className="hover:bg-gray-300 px-4 py-2 w-full
                 transition-all text-gray-800 hover:text-primary"
              >
                <AuthLayout label="register" />
              </div>
            </li>
          </ul>
        )}
        {isLoggedIn && showLinks && (
          <MobileViewOVerlay onClose={() => setShowLinks(false)} />
        )}
      </nav>
    </Fragment>
  );
};
