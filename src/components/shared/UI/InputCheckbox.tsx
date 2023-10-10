import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

interface InputCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export const InputCheckbox: React.FC<InputCheckboxProps> = (props) => {
  return (
    <Fragment>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className={twMerge(
            `form-checkbox h-4 w-4 text-green-500 border-2
            border-gray-300 focus:ring-2 focus:ring-primary`,
            props.className
          )}
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="ml-3 text-gray-700">{props.label && props.label}</span>
      </label>
    </Fragment>
  );
};
