import React, { Fragment, useState } from "react";
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
import { useInputValidation } from "../../../hooks/useInputValidation";

const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber.trim().startsWith("2567") && phoneNumber.trim().length === 12;
const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

interface SignInProps {
  onUpdateLabel: (label: string) => void;
}

export const SignIn: React.FC<SignInProps> = (props) => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const {
    value: phoneNumberValue,
    hasError: phoneNumberHasError,
    inputBlurHandler: phoneNumberInputBlurHandler,
    valueChangeHandler: phoneNumberValueChangeHandler,

    isValid: phoneNumberIsValid,
  } = useInputValidation(validatePhoneNumber);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordValueChangeHandler,

    isValid: passwordIsValid,
  } = useInputValidation(validatePassword);

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

    const formIsValid = phoneNumberIsValid && passwordIsValid;
    if (!formIsValid) {
      showCardNotification({
        type: "error",
        message: "Please check the form errors",
      });
    }
    mutate({
      phoneNumber: phoneNumberValue,
      password: passwordValue,
    });
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
          <label htmlFor="email" className="text-gray-dark-3">
            Phone number
          </label>
          <input
            className="border-[2px] border-gray-400 focus:border-primary
                   focus:bg-gray-200 transition-all outline-none p-2  rounded
                    bg-gray-light-1 text-sm"
            type="text"
            value={phoneNumberValue}
            onChange={phoneNumberValueChangeHandler}
            onBlur={phoneNumberInputBlurHandler}
            placeholder="Enter your phone number"
            required
          />
          {phoneNumberHasError && (
            <span className="text-red-500 w-full text-start">
              Please provide a valid phone number
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
          <label htmlFor="password" className="text-gray-dark-3">
            Password
          </label>
          <div className="flex flex-col justify-center relative">
            <input
              className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2  rounded
               bg-gray-light-1 text-sm"
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={passwordValueChangeHandler}
              onBlur={passwordInputBlurHandler}
              placeholder="Enter your password"
              required
            />
            {!showPassword && (
              <svg
                className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
                 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <use href={`${sprite}#icon-eye`}></use>
              </svg>
            )}
            {showPassword && (
              <svg
                className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
               cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <use href={`${sprite}#icon-eyeclosed`}></use>
              </svg>
            )}
          </div>
          {passwordHasError && (
            <span className="text-red-500 w-full text-start">
              Please provide a valid password
            </span>
          )}
        </div>
        <div
          className="w-full mt-6 flex items-center justify-center
                bg-primary rounded py-[2px]"
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
            onClick={() => updateAuthLabel("register")}
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
