import React, { Fragment, useState } from "react";
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
import { InputField } from "../../shared/UI/InputField";
import { InputFieldPassword } from "../../shared/UI/InputFieldPassword";

interface SignUpProps {
  onUpdateLabel: (label: string) => void;
}

export const SignUp: React.FC<SignUpProps> = (props) => {
  // first name
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [isValidFirstName, setIsValidFirstName] = useState<boolean>(false);
  const firstNameValueChangeHandler = (value: string) => {
    setFirstNameValue(() => value);
  };
  const isValidFirstNameHandler = (value: boolean) => {
    if (value) setIsValidFirstName(() => true);
  };
  const validateFirstName = (firstName: string) => firstName.trim() !== "";

  // last name
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [isValidLastName, setIsValidLastName] = useState<boolean>(false);
  const lastNameValueChangeHandler = (value: string) => {
    setLastNameValue(() => value);
  };
  const isValidLastNameHandler = (value: boolean) => {
    if (value) setIsValidLastName(() => true);
  };
  const validateLastName = (lastName: string) => lastName.trim() !== "";
  // phone number
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
      isValidFirstName &&
      isValidLastName &&
      isValidPhoneNumber &&
      isValidPassword &&
      isValidConfirmPassword;

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
          <InputField
            label="First name"
            type="text"
            required={true}
            placeholder="First name"
            validateInputValue={validateFirstName}
            inputValueHandler={firstNameValueChangeHandler}
            isValidInputHandler={isValidFirstNameHandler}
            errorMessage="Please provide valid first name"
            className="w-full"
          />
          <InputField
            label="Last name"
            type="text"
            required={true}
            placeholder="Last name"
            validateInputValue={validateLastName}
            inputValueHandler={lastNameValueChangeHandler}
            isValidInputHandler={isValidLastNameHandler}
            errorMessage="Please provide valid last name"
            className="w-full"
          />
          <InputField
            label="Phone number"
            type="text"
            required={true}
            placeholder="Your phone number"
            validateInputValue={validatePhoneNumber}
            inputValueHandler={phoneValueChangeHandler}
            isValidInputHandler={isValidPhoneNumberHandler}
            errorMessage="Please provide valid phone number"
            className="w-full"
          />
          <InputFieldPassword
            label="Password"
            required={true}
            placeholder="Enter your password"
            validateInputValue={validatePassword}
            inputValueHandler={passwordValueChangeHandler}
            isValidInputHandler={isValidPasswordHandler}
            errorMessage="Please provide valid password"
            className="w-full"
          />
          <InputFieldPassword
            label="confirm password"
            required={true}
            placeholder="Enter confirm password"
            validateInputValue={validateConfirmPassword}
            inputValueHandler={confirmPasswordValueChangeHandler}
            isValidInputHandler={isValidConfirmPasswordHandler}
            errorMessage="Passwords don't match"
            className="w-full"
          />
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
