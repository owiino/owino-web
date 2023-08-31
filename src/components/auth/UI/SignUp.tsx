import React, { Fragment, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signUp } from "../../../API/auth";
import { authenticate } from "../../../store/actions/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { TAuth } from "../../../types/auth";
import sprite from "../../../assets/icons/sprite.svg";

interface SignUpProps {
  onUpdateLabel: (label: string) => void;
}

export const SignUp: React.FC<SignUpProps> = (props) => {
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (auth: TAuth) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "Your account has been created successfully ",
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

  const signUpHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const firstName = firstNameRef.current && firstNameRef.current.value;
    const lastName = lastNameRef.current && lastNameRef.current.value;
    const phoneNumber = phoneNumberRef.current && phoneNumberRef.current.value;
    const password = passwordRef.current && passwordRef.current.value;
    const confirmPassword =
      confirmPasswordRef.current && confirmPasswordRef.current.value;

    if (!firstName || !lastName || !phoneNumber || !password) return;
    if (password !== confirmPassword) return;
    mutate({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      password: password,
    });
  };

  const updateAuthLabel = (label: string) => {
    props.onUpdateLabel(label);
  };

  return (
    <Fragment>
      <form
        onSubmit={(event) => signUpHandler(event)}
        className="p-4 sm:p-8 w-full"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Welcome!</h1>
          <p>Lets create your account</p>
        </div>
        <div className="overflow-x-hidden h-44 pr-2">
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="firstName" className="text-gray-dark-3">
              First name
            </label>
            <input
              className="border-[2px] border-gray-400 focus:border-primary
              focus:bg-gray-200 transition-all outline-none p-2 rounded 
               bg-gray-light-1 text-sm"
              type="text"
              ref={firstNameRef}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="lastName" className="text-gray-dark-3">
              Last name
            </label>
            <input
              className="border-[2px] border-gray-400 focus:border-primary
             focus:bg-gray-200 transition-all outline-none p-2 rounded 
             bg-gray-light-1 text-sm"
              type="text"
              ref={lastNameRef}
              placeholder="Enter your last name"
              required
            />
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
              ref={phoneNumberRef}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="password" className="text-gray-dark-3">
              Password
            </label>
            <input
              className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2  rounded
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
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="confirm password" className="text-gray-dark-3">
              Confirm password
            </label>
            <input
              className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2  rounded
               bg-gray-light-1 text-sm"
              type={showConfirmPassword ? "text" : "password"}
              ref={confirmPasswordRef}
              placeholder="Enter confirm password"
              required
            />
            {!showConfirmPassword && (
              <svg
                className="w-6 h-6 fill-gray-dark-2 absolute right-3 top-[45%]
                 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <use href={`${sprite}#icon-eye`}></use>
              </svg>
            )}
            {showConfirmPassword && (
              <svg
                className="w-6 h-6 fill-gray-dark-2 absolute right-3 top-[45%]
               cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <use href={`${sprite}#icon-eyeclosed`}></use>
              </svg>
            )}
          </div>
        </div>
        <div
          className="w-full mt-6 flex items-center justify-center
          bg-primary rounded border-t-[1px] border-gray-opacity"
        >
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Register
            </Button>
          )}
          {isLoading && <Spinner label="Registering" className="w-40" />}
        </div>
        <div className="w-full mt-4 flex items-center justify-start gap-x-1">
          <span>Already have an account?</span>
          <span
            onClick={() => updateAuthLabel("signin")}
            className="cursor-pointer focus:underline hover:underline
                  text-primary ml-2"
          >
            LogIn
          </span>
        </div>
      </form>
    </Fragment>
  );
};
