import React, { Fragment } from "react";
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

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (response) => {
      dispatch(
        showCardNotification({
          type: "success",
          message: response.message,
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

  //   const updateAuthLabel = (label: string) => {
  //     props.onUpdateLabel(label);
  //   };
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
          <label htmlFor="email" className="text-gray-dark-3">
            Enter your phone number and we'll send you a reset token
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
