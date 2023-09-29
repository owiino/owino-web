import React, { Fragment, useState } from "react";

export const ProductLocationCategoryForm: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [activeInputField, setActiveInputField] = useState<string>("");

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => setIsFocused(false);
  const isActiveField = (activeField: string) => {
    return isFocused && activeInputField === activeField;
  };
  return (
    <Fragment>
      <div className="w-full">
        <form className="">
          <div className="flex flex-col justify-center relative space-y-[4px] mb-2">
            <label
              htmlFor="category"
              className={`${
                isActiveField("category") ? "text-primary" : "text-gray-800"
              }`}
            >
              Category
            </label>
            <div className="relative w-full">
              <select
                onChange={() => {}}
                onBlur={() => onBlurHandler()}
                onFocus={() => {
                  onFocusHandler(), setActiveInputField(() => "category");
                }}
                className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
                ${isActiveField("phoneNumber") && "animate-border"}`}
              >
                {/* {options.map((country, index) => {
                return ( */}
                <option key={""} value={"label"}>
                  {"label"}
                </option>
                {/* );
              })} */}
              </select>
              <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
              {isActiveField("category") && (
                <div
                  className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                />
              )}
            </div>
            {/* {categoryHasError && (
            <span className="text-red-500 w-full text-start">
              Please select category
            </span>
          )} */}
          </div>
          <div className="flex flex-col justify-center relative space-y-[4px] mb-2">
            <label
              htmlFor="location"
              className={`${
                isActiveField("location") ? "text-primary" : "text-gray-800"
              }`}
            >
              Location
            </label>
            <div className="relative w-full">
              <select
                onChange={() => {}}
                onBlur={() => onBlurHandler()}
                onFocus={() => {
                  onFocusHandler(), setActiveInputField(() => "location");
                }}
                className={`outline-none p-[10px] rounded w-full bg-gray-300 text-sm 
                ${isActiveField("location") && "animate-border"}`}
              >
                {/* {options.map((country, index) => {
                return ( */}
                <option key={""} value={"label"}>
                  {"label"}
                </option>
                {/* );
              })} */}
              </select>
              <div className="absolute bottom-[0.5px] inset-x-0 h-[2px] bg-gray-400 x-10" />
              {isActiveField("location") && (
                <div
                  className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
                   animate-radiate z-40"
                />
              )}
            </div>
            {/* {categoryHasError && (
            <span className="text-red-500 w-full text-start">
              Please select location
            </span>
          )} */}
          </div>
        </form>
      </div>
    </Fragment>
  );
};
