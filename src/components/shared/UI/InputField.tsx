import React, { Fragment, useState, useEffect } from "react";
import { uppercaseFirstLetter } from "../../../utils";
import { useInputValidation } from "../../../hooks/useInputValidation";

interface InputFieldProps {
  label: string;
  type: "text" | "password" | "email";
  required: boolean;
  placeholder: string;
  errorMessage: string;
  isValidInputHandler: (value: boolean) => void;
  inputValueHandler: (value: string) => void;
  /**
   * validateInputValue function that takes string argument performs
   * regex operations on it and return boolean
   */
  validateInputValue: (value: string) => boolean;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };

  const validateInputValue = props.validateInputValue;
  const {
    value: inputValue,
    hasError: inputHasError,
    inputBlurHandler: inputBlurHandler,
    valueChangeHandler: inputValueChangeHandler,

    isValid: inputIsValid,
  } = useInputValidation(validateInputValue);

  useEffect(() => {
    const valueHandler = () => {
      props.inputValueHandler(inputValue);
      props.isValidInputHandler(inputIsValid);
    };
    valueHandler();
  }, [inputValue]);

  return (
    <Fragment>
      <div className="flex flex-col justify-center relative space-y-[4px]">
        <label
          htmlFor={props.label}
          className={`${
            isActiveField(props.label) ? "text-primary" : "text-gray-800"
          }`}
        >
          {uppercaseFirstLetter(props.label)}
        </label>
        <div className="relative w-full">
          <input
            className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
          ${isActiveField(props.label) && "animate-border"}`}
            type={props.type}
            required={props.required}
            placeholder={props.placeholder}
            onChange={inputValueChangeHandler}
            onBlur={() => {
              inputBlurHandler(), onBlurHandler();
            }}
            onFocus={() => {
              onFocusHandler(), setActiveInputField(() => props.label);
            }}
          />
          <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
          {isActiveField(props.label) && (
            <div
              className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
               animate-radiate z-40"
            />
          )}
        </div>
        {inputHasError && (
          <span className="text-red-500 w-full text-start text-sm">
            {props.errorMessage}
          </span>
        )}
      </div>
    </Fragment>
  );
};
