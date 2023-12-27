import React, { Fragment, useState, ReactNode } from "react";
import sprite from "../../../assets/icons/sprite.svg";
import { NavLink } from "react-router-dom";
import { logOut } from "../../../store/actions/auth";
import { useDispatch } from "react-redux";

interface DropDownOverlayProps {
  onClose: () => void;
}

const DropDownOverlay: React.FC<DropDownOverlayProps> = (props) => {
  return (
    <Fragment>
      <div
        onClick={props.onClose}
        className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50"
      />
    </Fragment>
  );
};

interface NavDropDownProps {
  children: ReactNode;
}

export const NavDropDown: React.FC<NavDropDownProps> = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch: any = useDispatch();

  const logOutHandler = () => {
    //TODO: make an api call to server to logout endpoint
    dispatch(dispatch(logOut()));
  };
  return (
    <Fragment>
      <div>
        <div
          className="relative"
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {props.children}
        </div>
        {showDropDown && (
          <ul
            className="absolute sm:right-5 bg-gray-100 py-2 space-y-1 rounded 
               shadow-lg z-[100] transition-all border-[1px] border-gray-opacity
               sm:border-none left-[35%] sm:left-auto top-16 sm:top-auto sm:mt-2"
          >
            <li>
              <NavLink
                to="/profile"
                className="flex items-center justify-start gap-x-2 text-sm pl-4 px-12"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-person-filled`}></use>
                  </svg>
                </span>
                <span className="text-gray-800">Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-shop"
                className="flex items-center justify-start gap-x-2 text-sm pl-4 px-12"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-shop`}></use>
                  </svg>
                </span>
                <span className="text-gray-800">My shop</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className="flex items-center justify-start gap-x-2 text-sm pl-4 px-12"
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-settings`}></use>
                  </svg>
                </span>
                <span className="text-gray-800">Settings</span>
              </NavLink>
            </li>
            <li className="border-t-[1px]  mt-2 pt-2 border-gray-opacity cursor-pointer">
              <div
                className="flex items-center justify-start gap-x-2 text-sm pl-4 px-12"
                onClick={() => logOutHandler()}
              >
                <span className="bg-gray-100 p-1 grid place-items-center rounded-[50%]">
                  <svg className="w-5 h-5 fill-gray-600">
                    <use href={`${sprite}#icon-logout`}></use>
                  </svg>
                </span>
                <span className="text-gray-800">Log out</span>
              </div>
            </li>
          </ul>
        )}
        {showDropDown && (
          <DropDownOverlay onClose={() => setShowDropDown(false)} />
        )}
      </div>
    </Fragment>
  );
};
