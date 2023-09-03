import React, { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { changePhoneNumber } from "../../../API/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { useInputValidation } from "../../../hooks/useInputValidation";

const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber.trim().startsWith("2567") && phoneNumber.trim().length === 12;
export const ChangePhoneNumber: React.FC = () => {
  const userId: number = useSelector((state: any) => state.auth.user.userId);

  const {
    value: phoneNumberValue,
    hasError: phoneNumberHasError,
    inputBlurHandler: phoneNumberInputBlurHandler,
    valueChangeHandler: phoneNumberValueChangeHandler,

    isValid: phoneNumberIsValid,
  } = useInputValidation(validatePhoneNumber);

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: changePhoneNumber,
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

    const formIsValid = phoneNumberIsValid;

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
      phoneNumber: phoneNumberValue,
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
            <label htmlFor="phoneNumber" className="text-gray-dark-3">
              New phone number
            </label>
            <div className="flex flex-col justify-center relative ">
              <input
                className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2  rounded
               bg-gray-light-1 text-sm"
                type="text"
                value={phoneNumberValue}
                onChange={phoneNumberValueChangeHandler}
                onBlur={phoneNumberInputBlurHandler}
                placeholder="Enter your current password"
                required
              />
            </div>
            {phoneNumberHasError && (
              <span className="text-red-500 w-full text-start text-sm">
                Please provide a valid phone number
              </span>
            )}
          </div>
          <div
            className="w-full flex items-center justify-center bg-primary 
             rounded border-t-[1px] border-gray-opacity py-[2px]"
          >
            {!isLoading && (
              <Button className="font-bold" type="submit">
                Change number
              </Button>
            )}
            {isLoading && <Spinner label="Changing" className="w-40" />}
          </div>
        </form>
      </Fragment>
    </Fragment>
  );
};
