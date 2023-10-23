import React, { Fragment, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../API/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { InputFieldPassword } from "../../shared/UI/InputFieldPassword";

export const ChangePassword: React.FC = () => {
  const userId: number = useSelector((state: any) => state.auth.user.userId);
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );

  // current password
  const [currentPasswordValue, setCurrentPasswordValue] = useState<string>("");
  const [isValidCurrentPassword, setIsValidCurrentPassword] =
    useState<boolean>(false);
  const currentPasswordValueChangeHandler = (value: string) => {
    setCurrentPasswordValue(() => value);
  };
  const isValidCurrentPasswordHandler = (value: boolean) => {
    if (value) setIsValidCurrentPassword(() => true);
  };
  const validateCurrentPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  // new password
  const [newPasswordValue, setNewPasswordValue] = useState<string>("");
  const [isValidNewPassword, setIsValidNewPassword] = useState<boolean>(false);
  const newPasswordValueChangeHandler = (value: string) => {
    setNewPasswordValue(() => value);
  };
  const isValidNewPasswordHandler = (value: boolean) => {
    if (value) setIsValidNewPassword(() => true);
  };
  const validateNewPassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  // confirm password
  const [_, setConfirmPasswordValue] = useState<string>("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>(false);
  const confirmPasswordValueChangeHandler = (value: string) => {
    setConfirmPasswordValue(() => value);
  };
  const isValidConfirmPasswordHandler = (value: boolean) => {
    if (value) setIsValidConfirmPassword(() => true);
  };
  const validateConfirmPassword = (confirmPassword: string) =>
    confirmPassword.trim() !== "" && confirmPassword === currentPasswordValue;
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
      isValidCurrentPassword && isValidNewPassword && isValidConfirmPassword;

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
      accessToken: accessToken,
    });
  };
  return (
    <Fragment>
      <Fragment>
        <form
          onSubmit={(event) => passwordChangeHandler(event)}
          className="w-full flex  flex-col items-start justify-center 
          sm:w-80 space-y-2"
        >
          <InputFieldPassword
            label="Current password"
            required={true}
            placeholder="Enter new password"
            validateInputValue={validateCurrentPassword}
            inputValueHandler={currentPasswordValueChangeHandler}
            isValidInputHandler={isValidCurrentPasswordHandler}
            errorMessage="Please provide valid password"
            className="w-full"
          />
          <InputFieldPassword
            label="New password"
            required={true}
            placeholder="Enter new password"
            validateInputValue={validateNewPassword}
            inputValueHandler={newPasswordValueChangeHandler}
            isValidInputHandler={isValidNewPasswordHandler}
            errorMessage="Please provide valid password"
            className="w-full"
          />

          <InputFieldPassword
            label="confirm new password"
            required={true}
            placeholder="Enter confirm password"
            validateInputValue={validateConfirmPassword}
            inputValueHandler={confirmPasswordValueChangeHandler}
            isValidInputHandler={isValidConfirmPasswordHandler}
            errorMessage="Passwords don't match"
            className="w-full"
          />
          <div
            className="w-full mt-6 flex items-center justify-center
          bg-primary rounded py-[2px]"
          >
            {!isLoading && (
              <Button className="font-bold" type="submit">
                Change Password
              </Button>
            )}
            {isLoading && (
              <div className="py-[6px] font-semibold text-gray-100">
                <Spinner label="Changing" className="w-5 h-5 text-gray-100" />
              </div>
            )}
          </div>
        </form>
      </Fragment>
    </Fragment>
  );
};
