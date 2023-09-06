import React, { Fragment, useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../API/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { useInputValidation } from "../../../hooks/useInputValidation";
import sprite from "../../../assets/icons/sprite.svg";

const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
export const ChangePassword: React.FC = () => {
  const userId: number = useSelector((state: any) => state.auth.user.userId);
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<Boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<Boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<Boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };

  const {
    value: currentPasswordValue,
    hasError: currentPasswordHasError,
    inputBlurHandler: currentPasswordInputBlurHandler,
    valueChangeHandler: currentPasswordValueChangeHandler,

    isValid: currentPasswordIsValid,
  } = useInputValidation(validatePassword);

  const {
    value: newPasswordValue,
    hasError: newPasswordHasError,
    inputBlurHandler: newPasswordInputBlurHandler,
    valueChangeHandler: newPasswordValueChangeHandler,

    isValid: newPasswordIsValid,
  } = useInputValidation(validatePassword);

  const [passwordMatch, setPasswordMatch] = useState<Boolean>(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<String>("");

  const confirmPasswordValueChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordValue(event.target.value);
    setPasswordMatch(() => {
      return newPasswordValue === event.target.value;
    });
  };
  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data: any) => {
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

  const passwordChangeHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const formIsValid =
      currentPasswordIsValid && newPasswordIsValid && passwordMatch;

    if (!formIsValid || !userId) {
      dispatch(
        showCardNotification({
          type: "error",
          message: "Please check the form errors",
        })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
      return;
    }
    mutate({
      userId: userId,
      currentPassword: currentPasswordValue,
      newPassword: newPasswordValue,
    });
  };
  return (
    <Fragment>
      <Fragment>
        <form
          onSubmit={(event) => passwordChangeHandler(event)}
          className="w-full flex  flex-col items-start justify-center 
          sm:w-80"
        >
          <div
            className="flex flex-col justify-center relative space-y-[4px]
             mb-4 w-full"
          >
            <label
              htmlFor="password"
              className={`${
                isActiveField("currentPassword")
                  ? "text-primary"
                  : "text-gray-800"
              }`}
            >
              Current password
            </label>
            <div className="flex flex-col justify-center relative ">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("currentPassword") && "animate-border"}`}
                  type={showCurrentPassword ? "text" : "currentPassword"}
                  value={currentPasswordValue}
                  onChange={currentPasswordValueChangeHandler}
                  onBlur={() => {
                    currentPasswordInputBlurHandler(), onBlurHandler();
                  }}
                  onFocus={() => {
                    onFocusHandler(),
                      setActiveInputField(() => "currentPassword");
                  }}
                  placeholder="Enter your current password"
                  required
                />
                <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
                {isActiveField("currentPassword") && (
                  <div
                    className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                  />
                )}
              </div>
              {!showNewPassword && (
                <svg
                  className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
                 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showNewPassword)}
                >
                  <use href={`${sprite}#icon-eye`}></use>
                </svg>
              )}
              {showNewPassword && (
                <svg
                  className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
               cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showNewPassword)}
                >
                  <use href={`${sprite}#icon-eyeclosed`}></use>
                </svg>
              )}
            </div>
            {currentPasswordHasError && (
              <span className="text-red-500 w-full text-start text-sm">
                Please provide a valid password
              </span>
            )}
          </div>
          <div
            className="flex flex-col justify-center relative space-y-[4px]
             mb-4 w-full"
          >
            <label
              htmlFor="password"
              className={`${
                isActiveField("newPassword") ? "text-primary" : "text-gray-800"
              }`}
            >
              New password
            </label>
            <div className="flex flex-col justify-center relative ">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("newPassword") && "animate-border"}`}
                  type={showNewPassword ? "text" : "password"}
                  value={newPasswordValue}
                  onChange={newPasswordValueChangeHandler}
                  onBlur={() => {
                    newPasswordInputBlurHandler(), onBlurHandler();
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
              {!showNewPassword && (
                <svg
                  className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
                 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <use href={`${sprite}#icon-eye`}></use>
                </svg>
              )}
              {showNewPassword && (
                <svg
                  className="w-6 h-6 fill-gray-500 absolute right-3 top-[20%]
               cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <use href={`${sprite}#icon-eyeclosed`}></use>
                </svg>
              )}
            </div>
            {newPasswordHasError && (
              <span className="text-red-500 w-full text-start">
                Please provide a valid password
              </span>
            )}
          </div>
          <div
            className="flex flex-col justify-center relative space-y-[4px] 
                mb-4 w-full"
          >
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
          <div
            className="w-full flex items-center justify-center bg-primary 
             rounded border-t-[1px] border-gray-opacity py-[2px]"
          >
            {!isLoading && (
              <Button className="font-bold" type="submit">
                Change Password
              </Button>
            )}
            {isLoading && <Spinner label="Changing" className="w-40" />}
          </div>
        </form>
      </Fragment>
    </Fragment>
  );
};
