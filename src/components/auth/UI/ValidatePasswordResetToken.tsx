import React, { Fragment, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { validatePasswordResetToken } from "../../../API/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { useInputValidation } from "../../../hooks/useInputValidation";

const validateResetToken = (resetToken: string) => resetToken.trim() !== "";

interface ForgotPasswordProps {
  onUpdateLabel: (label: string) => void;
}

export const ValidatePasswordResetToken: React.FC<ForgotPasswordProps> = (
  props
) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };

  const {
    value: resetTokenValue,
    hasError: resetTokenHasError,
    inputBlurHandler: resetTokenInputBlurHandler,
    valueChangeHandler: resetTokenValueChangeHandler,

    isValid: resetTokenIsValid,
  } = useInputValidation(validateResetToken);
  const [isValidToken, setIsValidToken] = useState(false);

  const dispatch: any = useDispatch();

  const saveUserIdToStorage = (userId: number) => {
    localStorage.setItem(
      "forgotPasswordUserId",
      JSON.stringify({ userId: userId })
    );
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: validatePasswordResetToken,
    onSuccess: (data) => {
      saveUserIdToStorage(data.data.user.userId);
      setIsValidToken((isValidToken) => !isValidToken);
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

    const formIsValid = resetTokenIsValid;
    if (!formIsValid) {
      showCardNotification({
        type: "error",
        message: "Please check the form errors",
      });
    }
    mutate({
      resetToken: resetTokenValue,
    });
  };

  useEffect(() => {
    const getUserId = () => {
      const forgotPasswordUserId = localStorage.getItem("forgotPasswordUserId");
      const userId =
        forgotPasswordUserId && JSON.parse(forgotPasswordUserId).userId;
      return userId;
    };
    const userId = getUserId();
    if (userId) {
      const updateAuthLabel = (label: string) => {
        props.onUpdateLabel(label);
      };
      updateAuthLabel("resetPassword");
    }
  }, [isValidToken, setIsValidToken]);

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
          <p>Lets verify token sent to your number</p>
        </div>
        <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
          <label
            htmlFor="email"
            className={`${
              isActiveField("token") ? "text-primary" : "text-gray-800"
            }`}
          >
            Enter reset token sent your number
          </label>

          <div className="relative w-full">
            <input
              className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("token") && "animate-border"}`}
              type="text"
              value={resetTokenValue}
              onChange={resetTokenValueChangeHandler}
              onBlur={() => {
                resetTokenInputBlurHandler(), onBlurHandler();
              }}
              onFocus={() => {
                onFocusHandler(), setActiveInputField(() => "token");
              }}
              placeholder="Enter token"
              required
            />
            <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
            {isActiveField("token") && (
              <div
                className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
              />
            )}
          </div>
          {resetTokenHasError && (
            <span className="text-red-500 w-full text-start">
              Please provide a valid token
            </span>
          )}
        </div>
        <div className="w-full mt-6 flex items-center justify-start rounded py-[2px]">
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Verify Token
            </Button>
          )}
          {isLoading && <Spinner label="Verifying" className="w-40" />}
        </div>
      </form>
    </Fragment>
  );
};
