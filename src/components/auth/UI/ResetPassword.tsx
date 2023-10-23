import React, { Fragment, useState } from "react";
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
import { InputFieldPassword } from "../../shared/UI/InputFieldPassword";

interface ResetPasswordProps {
  onUpdateLabel: (label: string) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = (props) => {
  console.log(props);
  const getUserId = () => {
    const forgotPasswordUserId = localStorage.getItem("forgotPasswordUserId");
    const userId =
      forgotPasswordUserId && JSON.parse(forgotPasswordUserId).userId;
    return userId;
  };

  // password
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
    confirmPassword.trim() !== "" && confirmPassword === passwordValue;

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

    const formIsValid = isValidPassword && isValidConfirmPassword;
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
        <InputFieldPassword
          label="New password"
          required={true}
          placeholder="Enter new password"
          validateInputValue={validatePassword}
          inputValueHandler={passwordValueChangeHandler}
          isValidInputHandler={isValidPasswordHandler}
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
