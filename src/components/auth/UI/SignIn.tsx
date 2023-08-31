import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signIn } from "../../../API/auth";
import { authenticate } from "../../../store/actions/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { TAuth } from "../../../types/auth";
import sprite from "../../../assets/icons/sprite.svg";

interface SignInProps {
  onUpdateLabel: (label: string) => void;
}

export const SignIn: React.FC<SignInProps> = (props) => {
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (auth: TAuth) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "You have logged in successfully",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const signInHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const phoneNumber = phoneNumberRef.current && phoneNumberRef.current.value;
    const password = passwordRef.current && passwordRef.current.value;

    if (!phoneNumber || !password) return;
    mutate({ phoneNumber: phoneNumber, password: password });
  };

  const updateAuthLabel = (label: string) => {
    props.onUpdateLabel(label);
  };

  return (
    <Fragment>
      <form
        onSubmit={(event) => signInHandler(event)}
        className="p-4 sm:p-8 full"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Welcome back</h1>
          <p>Log into your account</p>
        </div>
        <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
          <label htmlFor="phoneNumber" className="text-gray-dark-3">
            Phone number
          </label>
          <input
            className="border-[2px] border-gray-400 focus:border-primary
                 focus:bg-gray-200 transition-all outline-none p-2  rounded
                 bg-gray-light-1 text-sm"
            type="text"
            ref={phoneNumberRef}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="flex flex-col justify-center relative space-y-[4px]">
          <label htmlFor="password" className="text-gray-dark-3">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-primary-dark hover:underline focus:underline
                absolute right-0 top-[-2px] outline-none"
          >
            Forgot password?
          </Link>
          <input
            className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2 rounded
               bg-gray-light-1 text-sm"
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            placeholder="Enter your password"
            required
          />
          {!showPassword && (
            <svg
              className="w-6 h-6 fill-gray-dark-2 absolute right-3 top-[45%]
                 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <use href={`${sprite}#icon-eye`}></use>
            </svg>
          )}
          {showPassword && (
            <svg
              className="w-6 h-6 fill-gray-dark-2 absolute right-3 top-[45%]
               cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <use href={`${sprite}#icon-eyeclosed`}></use>
            </svg>
          )}
        </div>
        <div
          className="w-full mt-6 flex items-center justify-center
                bg-primary rounded"
        >
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Log in
            </Button>
          )}
          {isLoading && <Spinner label="Logging in" className="w-40" />}
        </div>
        <div className="w-full mt-4">
          <span>Don't have an account?</span>
          <span
            onClick={() => updateAuthLabel("signup")}
            className="cursor-pointer focus:underline hover:underline
                  text-primary ml-2"
          >
            Register
          </span>
        </div>
      </form>
    </Fragment>
  );
};
