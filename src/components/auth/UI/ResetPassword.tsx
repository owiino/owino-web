import React, { Fragment, ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../API/auth";
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

interface ResetPasswordProps {
  onUpdateLabel: (label: string) => void;
}

const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

export const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  console.log(props);
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };

  const getUserId = () => {
    const forgotPasswordUserId = localStorage.getItem("forgotPasswordUserId");
    const userId =
      forgotPasswordUserId && JSON.parse(forgotPasswordUserId).userId;
    return userId;
  };

  const {
    value: passwordValue,
    hasError: passwordHasError,
    inputBlurHandler: passwordInputBlurHandler,
    valueChangeHandler: passwordValueChangeHandler,

    isValid: passwordIsValid,
  } = useInputValidation(validatePassword);

  const [passwordMatch, setPasswordMatch] = useState<Boolean>(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<String>("");

  const confirmPasswordValueChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordValue(event.target.value);
    setPasswordMatch(() => {
      return passwordValue === event.target.value;
    });
  };
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (auth: TAuth) => {
      dispatch(authenticate(auth));
      localStorage.removeItem("forgotPasswordUserId");
      dispatch(
        showCardNotification({
          type: "success",
          message: "Your password has been reset successfully",
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

  const resetPasswordHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const formIsValid = passwordIsValid && passwordMatch;
    const userId = getUserId();

    if (!formIsValid || !userId) {
      showCardNotification({
        type: "error",
        message: "Please check the form errors",
      });
    }
    mutate({
      userId: userId,
      password: passwordValue,
    });
  };

  //   const updateAuthLabel = (label: string) => {
  //     props.onUpdateLabel(label);
  //   };

  return (
    <Fragment>
      <form
        onSubmit={(event) => resetPasswordHandler(event)}
        className="p-8 full"
      >
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">
            Reset Password
          </h1>
          <p>Provide your new password</p>
        </div>
        <div className="overflow-x-hidden h-44 pr-2">
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label
              htmlFor="newPassword"
              className={`${
                isActiveField("newPassword") ? "text-primary" : "text-gray-800"
              }`}
            >
              New password
            </label>
            <div className="flex flex-col justify-center relative">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("newPassword") && "animate-border"}`}
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={passwordValueChangeHandler}
                  onBlur={() => {
                    passwordInputBlurHandler(), onBlurHandler();
                  }}
                  onFocus={() => {
                    onFocusHandler(), setActiveInputField(() => "newPassword");
                  }}
                  placeholder="Enter your new password"
                  required
                />
                <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
                {isActiveField("newPassword") && (
                  <div
                    className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                  />
                )}
              </div>
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
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label
              htmlFor="confirm password"
              className={`${
                isActiveField("confirmPassword")
                  ? "text-primary"
                  : "text-gray-800"
              }`}
            >
              Confirm new password
            </label>
            <div className="flex flex-col justify-center relative">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("confirmPassword") && "animate-border"}`}
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={confirmPasswordValueChangeHandler}
                  onBlur={() => onBlurHandler()}
                  onFocus={() => {
                    onFocusHandler(),
                      setActiveInputField(() => "confirmPassword");
                  }}
                  placeholder="Enter confirm password"
                  required
                />
                <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
                {isActiveField("confirmPassword") && (
                  <div
                    className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                  />
                )}
              </div>
              {!showConfirmPassword && (
                <svg
                  className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
                 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <use href={`${sprite}#icon-eye`}></use>
                </svg>
              )}
              {showConfirmPassword && (
                <svg
                  className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
                cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <use href={`${sprite}#icon-eyeclosed`}></use>
                </svg>
              )}
            </div>
            {!passwordMatch && confirmPasswordValue && (
              <span className="text-red-500 w-full text-start">
                Passwords don't match
              </span>
            )}
          </div>
        </div>
        <div
          className="w-full mt-6 flex items-center justify-center
          bg-primary rounded border-t-[1px] border-gray-opacity py-[2px]"
        >
          {!isLoading && (
            <Button className="font-bold" type="submit">
              Submit New Password
            </Button>
          )}
          {isLoading && <Spinner label="Resetting" className="w-40" />}
        </div>
      </form>
    </Fragment>
  );
};
