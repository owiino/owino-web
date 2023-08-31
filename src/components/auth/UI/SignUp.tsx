import React, { Fragment, useRef } from "react";
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

interface SignUpProps {
  onUpdateLabel: (label: string) => void;
}

export const SignUp: React.FC<SignUpProps> = (props) => {
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
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
        className="min-w-[300px] p-4 sm:p-8 sm:w-3/5"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Welcome!</h1>
          <p>Lets create your account</p>
        </div>
        <div className="overflow-x-hidden h-44 pr-2">
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="username" className="text-gray-dark-3">
              Username
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                   focus:bg-gray-200 transition-all outline-none p-2 rounded 
                   bg-gray-light-1 text-sm"
              type="text"
              ref={firstNameRef}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="email" className="text-gray-dark-3">
              Email
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                   focus:bg-gray-200 transition-all outline-none p-2  rounded
                    bg-gray-light-1 text-sm"
              type="email"
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
              className="border-[1px] border-gray-400 focus:border-primary
                 focus:bg-gray-200 transition-all outline-none  p-2  rounded
                 bg-gray-light-1 text-sm"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label htmlFor="confirm password" className="text-gray-dark-3">
              Confirm password
            </label>
            <input
              className="border-[1px] border-gray-400 focus:border-primary
                  focus:bg-gray-200 transition-all outline-none  p-2  rounded
                  bg-gray-light-1 text-sm"
              type="password"
              ref={confirmPasswordRef}
              placeholder="Enter confirm password"
              required
            />
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
          {isLoading && <Spinner label="Signing up" className="w-40" />}
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
