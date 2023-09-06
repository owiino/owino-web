import React, { Fragment, useState } from "react";
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
import { UploadUserImage } from "./UploadUserImage";

const validFirstName = (firstName: string) => firstName.trim() !== "";
const validLastName = (lastName: string) => lastName.trim() !== "";

export const EditPersonalDetails: React.FC = () => {
  const userId: number = useSelector((state: any) => state.auth.user.userId);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };

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
      <div>
        <div className="sm:w-80 flex items-center justify-center my-4">
          <UploadUserImage />
        </div>
        <form
          onSubmit={(event) => editPersonalChangeHandler(event)}
          className="w-full flex  flex-col items-start justify-center 
          sm:w-80"
        >
          <div
            className="flex flex-col justify-center relative space-y-[4px]
             mb-4 w-full"
          >
            <label
              htmlFor="firstName"
              className={`${
                isActiveField("firstName") ? "text-primary" : "text-gray-800"
              }`}
            >
              First name
            </label>
            <div className="flex flex-col justify-center relative ">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("firstName") && "animate-border"}`}
                  type="text"
                  value={firstNameValue}
                  onChange={firstNameValueChangeHandler}
                  onBlur={() => {
                    firstNameInputBlurHandler(), onBlurHandler();
                  }}
                  onFocus={() => {
                    onFocusHandler(), setActiveInputField(() => "firstName");
                  }}
                  placeholder="Enter your first name"
                  required
                />
                <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
                {isActiveField("firstName") && (
                  <div
                    className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                  />
                )}
              </div>
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
            <label
              htmlFor="lastName"
              className={`${
                isActiveField("lastName") ? "text-primary" : "text-gray-800"
              }`}
            >
              Last name
            </label>
            <div className="flex flex-col justify-center relative">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("lastName") && "animate-border"}`}
                  type="text"
                  value={lastNameValue}
                  onChange={lastNameValueChangeHandler}
                  onBlur={() => {
                    lastNameInputBlurHandler(), onBlurHandler();
                  }}
                  onFocus={() => {
                    onFocusHandler(), setActiveInputField(() => "lastName");
                  }}
                  placeholder="Enter your last name"
                  required
                />
                <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
                {isActiveField("lastName") && (
                  <div
                    className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                  />
                )}
              </div>
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
      </div>
    </Fragment>
  );
};
