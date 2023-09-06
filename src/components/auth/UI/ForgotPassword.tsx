import React, { Fragment, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../../API/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { useInputValidation } from "../../../hooks/useInputValidation";

const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber.trim().startsWith("2567") && phoneNumber.trim().length === 12;

interface ForgotPasswordProps {
  onUpdateLabel: (label: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const {
    value: phoneNumberValue,
    hasError: phoneNumberHasError,
    inputBlurHandler: phoneNumberInputBlurHandler,
    valueChangeHandler: phoneNumberValueChangeHandler,

    isValid: phoneNumberIsValid,
  } = useInputValidation(validatePhoneNumber);
  const [tokenRequestSuccessful, setTokenRequestSuccessful] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setTokenRequestSuccessful(
        (tokenRequestSuccessful) => !tokenRequestSuccessful
      );
      dispatch(
        showCardNotification({
          type: "success",
          message: data.message,
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

  const forgotPasswordHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const formIsValid = phoneNumberIsValid;
    if (!formIsValid) {
      showCardNotification({
        type: "error",
        message: "Please check the form errors",
      });
    }
    mutate({
      phoneNumber: phoneNumberValue,
    });
  };

  useEffect(() => {
    if (tokenRequestSuccessful) {
      const updateAuthLabel = (label: string) => {
        props.onUpdateLabel(label);
      };
      updateAuthLabel("validatePasswordResetToken");
    }
  }, [tokenRequestSuccessful, setTokenRequestSuccessful]);

  return (
    <Fragment>
      <form
        onSubmit={(event) => forgotPasswordHandler(event)}
        className="p-4 sm:p-8 full"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">
            Password Reset
          </h1>
          <p>Lets reset password for your account</p>
        </div>
        <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
          <label
            htmlFor="phoneNumber"
            className={`${
              isActiveField("phoneNumber") ? "text-primary" : "text-gray-800"
            }`}
          >
            Enter your phone number and we'll send you a reset token
          </label>
          <div className="relative w-full">
            <input
              className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("phoneNumber") && "animate-border"}`}
              type="text"
              value={phoneNumberValue}
              onChange={phoneNumberValueChangeHandler}
              onBlur={() => {
                phoneNumberInputBlurHandler(), onBlurHandler();
              }}
              onFocus={() => {
                onFocusHandler(), setActiveInputField(() => "phoneNumber");
              }}
              placeholder="Enter your phone number"
              required
            />
            <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
            {isActiveField("phoneNumber") && (
              <div
                className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
              />
            )}
          </div>
          {phoneNumberHasError && (
            <span className="text-red-500 w-full text-start">
              Please provide a valid phone number
            </span>
          )}
        </div>
        <div className="w-full mt-6 flex items-center justify-start rounded py-[2px]">
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Reset Password
            </Button>
          )}
          {isLoading && <Spinner label="Logging in" className="w-40" />}
        </div>
      </form>
    </Fragment>
  );
};
