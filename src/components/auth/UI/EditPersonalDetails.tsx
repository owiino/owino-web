import React, { Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { editPersonalDetails } from "../../../API/auth";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../store/actions/notification";
import { Spinner } from "../../shared/UI/Loader/Spinner";
import { Button } from "../../shared/UI/Button";
import { useInputValidation } from "../../../hooks/useInputValidation";

const validFirstName = (firstName: string) => firstName.trim() !== "";
const validLastName = (lastName: string) => lastName.trim() !== "";

export const EditPersonalDetails: React.FC = () => {
  const userId: number = useSelector((state: any) => state.auth.user.userId);

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameInputBlurHandler,
    valueChangeHandler: firstNameValueChangeHandler,

    isValid: firstNameIsValid,
  } = useInputValidation(validFirstName);

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameInputBlurHandler,
    valueChangeHandler: lastNameValueChangeHandler,

    isValid: lastNameIsValid,
  } = useInputValidation(validLastName);

  // TODO: to add location, gender  and birthday

  const dispatch: any = useDispatch();

  const { isLoading, mutate } = useMutation({
    mutationFn: editPersonalDetails,
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

  const editPersonalChangeHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const formIsValid = firstNameIsValid && lastNameIsValid;

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
      firstName: firstNameValue,
      lastName: lastNameValue,
    });
  };
  return (
    <Fragment>
      <Fragment>
        <form
          onSubmit={(event) => editPersonalChangeHandler(event)}
          className="w-full flex  flex-col items-start justify-center 
          sm:w-80"
        >
          <div
            className="flex flex-col justify-center relative space-y-[4px]
             mb-4 w-full"
          >
            <label htmlFor="firstName" className="text-gray-dark-3">
              First name
            </label>
            <div className="flex flex-col justify-center relative ">
              <input
                className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2  rounded
               bg-gray-light-1 text-sm"
                type="text"
                value={firstNameValue}
                onChange={firstNameValueChangeHandler}
                onBlur={firstNameInputBlurHandler}
                placeholder="Enter your first name"
                required
              />
            </div>
            {firstNameHasError && (
              <span className="text-red-500 w-full text-start text-sm">
                Please provide a valid first name
              </span>
            )}
          </div>
          <div
            className="flex flex-col justify-center relative space-y-[4px]
             mb-4 w-full"
          >
            <label htmlFor="lastName" className="text-gray-dark-3">
              Last name
            </label>
            <div className="flex flex-col justify-center relative ">
              <input
                className="border-[2px] border-gray-400 focus:border-primary
               focus:bg-gray-200 transition-all outline-none  p-2  rounded
               bg-gray-light-1 text-sm"
                type="text"
                value={lastNameValue}
                onChange={lastNameValueChangeHandler}
                onBlur={lastNameInputBlurHandler}
                placeholder="Enter your last name"
                required
              />
            </div>
            {lastNameHasError && (
              <span className="text-red-500 w-full text-start text-sm">
                Please provide a valid first last
              </span>
            )}
          </div>
          <div
            className="w-full flex items-center justify-center bg-primary 
             rounded border-t-[1px] border-gray-opacity py-[2px]"
          >
            {!isLoading && (
              <Button className="font-bold" type="submit">
                Edit
              </Button>
            )}
            {isLoading && <Spinner label="Editing" className="w-40" />}
          </div>
        </form>
      </Fragment>
    </Fragment>
  );
};
