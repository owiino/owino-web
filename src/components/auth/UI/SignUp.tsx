import React, { Fragment, ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signUp } from "../../../API/auth";
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

interface SignUpProps {
  onUpdateLabel: (label: string) => void;
}

const validateFirstName = (firstName: string) => firstName.trim() !== "";
const validateLastName = (lastName: string) => lastName.trim() !== "";
const validatePhoneNumber = (phoneNumber: string) =>
  phoneNumber.trim().startsWith("2567") && phoneNumber.trim().length === 12;
const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

export const SignUp: React.FC<SignUpProps> = (props) => {
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

  const {
    value: firstNameValue,
    hasError: firstNameHasError,
    inputBlurHandler: firstNameInputBlurHandler,
    valueChangeHandler: firstNameValueChangeHandler,

    isValid: firstNameIsValid,
  } = useInputValidation(validateFirstName);

  const {
    value: lastNameValue,
    hasError: lastNameHasError,
    inputBlurHandler: lastNameInputBlurHandler,
    valueChangeHandler: lastNameValueChangeHandler,

    isValid: lastNameIsValid,
  } = useInputValidation(validateLastName);

  const {
    value: phoneNumberValue,
    hasError: phoneNumberHasError,
    inputBlurHandler: phoneNumberInputBlurHandler,
    valueChangeHandler: phoneNumberValueChangeHandler,

    isValid: phoneNumberIsValid,
  } = useInputValidation(validatePhoneNumber);

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
    mutationFn: signUp,
    onSuccess: (auth: TAuth) => {
      dispatch(authenticate(auth));
      dispatch(
        showCardNotification({
          type: "success",
          message: "Your account has been created successfully ",
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

  const signUpHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const formIsValid =
      firstNameIsValid &&
      lastNameIsValid &&
      phoneNumberIsValid &&
      passwordIsValid &&
      passwordMatch;

    if (!formIsValid) {
      showCardNotification({
        type: "error",
        message: "Please check the form errors",
      });
    }
    mutate({
      firstName: firstNameValue,
      lastName: lastNameValue,
      phoneNumber: phoneNumberValue,
      password: passwordValue,
    });
  };

  const updateAuthLabel = (label: string) => {
    props.onUpdateLabel(label);
  };

  return (
    <Fragment>
      <form onSubmit={(event) => signUpHandler(event)} className="p-8 full">
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-dark-3">Welcome!</h1>
          <p>Lets create your account</p>
        </div>
        <div className="overflow-x-hidden h-44 pr-2">
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label
              htmlFor="firstName"
              className={`${
                isActiveField("firstName") ? "text-primary" : "text-gray-800"
              }`}
            >
              First name
            </label>
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
            {firstNameHasError && (
              <span className="text-red-500 w-full text-start">
                Please provide a valid first name
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label
              htmlFor="lastName"
              className={`${
                isActiveField("lastName") ? "text-primary" : "text-gray-800"
              }`}
            >
              Last name
            </label>
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
            {lastNameHasError && (
              <span className="text-red-500 w-full text-start">
                Please provide a valid last name
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label
              htmlFor="email"
              className={`${
                isActiveField("phoneNumber") ? "text-primary" : "text-gray-800"
              }`}
            >
              Phone number
            </label>
            <div className="relative w-full">
              <input
                className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("phoneNumber") && "animate-border"}`}
                type="text"
                value={phoneNumberValue}
                onChange={phoneNumberValueChangeHandler}
                onBlur={() => {
                  phoneNumberInputBlurHandler(), onBlurHandler();
                }}
                onFocus={() => {
                  onFocusHandler(), setActiveInputField(() => "phoneNumber");
                }}
                placeholder="Enter your phone number"
                required
              />
              <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
              {isActiveField("phoneNumber") && (
                <div
                  className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                />
              )}
            </div>
            {phoneNumberHasError && (
              <span className="text-red-500 w-full text-start">
                Please provide a valid phone number
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-4">
            <label
              htmlFor="password"
              className={`${
                isActiveField("password") ? "text-primary" : "text-gray-800"
              }`}
            >
              Password
            </label>
            <div className="flex flex-col justify-center relative">
              <div className="relative w-full">
                <input
                  className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
              ${isActiveField("password") && "animate-border"}`}
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={passwordValueChangeHandler}
                  onBlur={() => {
                    passwordInputBlurHandler(), onBlurHandler();
                  }}
                  onFocus={() => {
                    onFocusHandler(), setActiveInputField(() => "password");
                  }}
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
                {isActiveField("password") && (
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
              Confirm password
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
              Register
            </Button>
          )}
          {isLoading && <Spinner label="Registering" className="w-40" />}
        </div>
        <div className="w-full mt-4 flex items-center justify-start gap-x-1">
          <span>Already have an account?</span>
          <span
            onClick={() => updateAuthLabel("logIn")}
            className="cursor-pointer focus:underline hover:underline
            text-primary ml-2"
          >
            LogIn
          </span>
        </div>
      </form>
    </Fragment>
  );
};
