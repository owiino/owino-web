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
import { InputField } from "../../shared/UI/InputField";

interface ForgotPasswordProps {
  onUpdateLabel: (label: string) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const [tokenRequestSuccessful, setTokenRequestSuccessful] = useState(false);

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

    const formIsValid = isValidPhoneNumber;
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
        className="p-8 full"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">
            Password Reset
          </h1>
          <p>Lets reset password for your account</p>
        </div>
        <InputField
          label=" Enter your phone number and we'll send you a reset token"
          type="text"
          required={true}
          placeholder="Password"
          validateInputValue={validatePhoneNumber}
          inputValueHandler={phoneValueChangeHandler}
          isValidInputHandler={isValidPhoneNumberHandler}
          errorMessage="Please provide valid phone number"
          className="w-full"
        />
        <div
          className="w-full mt-6 flex items-center justify-center
          bg-primary rounded py-[2px]"
        >
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Submit
            </Button>
          )}
          {isLoading && (
            <div className="py-[6px] font-semibold text-gray-100">
              <Spinner label="Submitting" className="w-5 h-5 text-gray-100" />
            </div>
          )}
        </div>
      </form>
    </Fragment>
  );
};
