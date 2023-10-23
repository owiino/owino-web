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
import { InputField } from "../../shared/UI/InputField";
import { InputFieldPassword } from "../../shared/UI/InputFieldPassword";

interface SignInProps {
  onUpdateLabel: (label: string) => void;
}

export const SignIn: React.FC<SignInProps> = (props) => {
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);
  const phoneValueChangeHandler = (value: string) => {
    setPhoneNumberValue(() => value);
  };
  const isValidPhoneNumberHandler = (value: boolean) => {
    if (value) setIsValidPhoneNumber(() => true);
  };
  const validatePhoneNumber = (phoneNumber: string) =>
    phoneNumber.trim().startsWith("2567") && phoneNumber.trim().length === 12;

  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const passwordValueChangeHandler = (value: string) => {
    setPasswordValue(() => value);
  };
  const isValidPasswordHandler = (value: boolean) => {
    if (value) setIsValidPassword(() => true);
  };
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

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

    const formIsValid = isValidPhoneNumber && isValidPassword;
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
      <form onSubmit={(event) => signInHandler(event)} className="p-8 full">
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Welcome back</h1>
          <p>Log into your account</p>
        </div>
        <InputField
          label="Your phone number"
          type="text"
          required={true}
          placeholder="Password"
          validateInputValue={validatePhoneNumber}
          inputValueHandler={phoneValueChangeHandler}
          isValidInputHandler={isValidPhoneNumberHandler}
          errorMessage="Please provide valid phone number"
          className="w-full"
        />
        <div className="relative mt-3">
          <InputFieldPassword
            label="Password"
            required={true}
            placeholder="Enter your password"
            validateInputValue={validatePassword}
            inputValueHandler={passwordValueChangeHandler}
            isValidInputHandler={isValidPasswordHandler}
            errorMessage="Please provide valid password"
            className="w-full"
          />
          <span
            onClick={() => updateAuthLabel("forgotPassword")}
            className="cursor-pointer focus:underline hover:underline
                  text-primary ml-2 absolute right-0 top-0"
          >
            Forgot password
          </span>
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
          {isLoading && (
            <div className="py-[6px] font-semibold text-gray-100">
              <Spinner label="Logging in" className="w-5 h-5 text-gray-100" />
            </div>
          )}
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
