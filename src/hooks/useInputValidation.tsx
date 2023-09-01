import { useReducer, ChangeEvent } from "react";
import { TInputState } from "../types/reducer";
import { TReducerAction } from "../types/reducer";

const initialInputState: TInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (
  state: TInputState,
  action: TReducerAction
): TInputState => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  if (action.type === "INITIAL_VALUE") {
    return { isTouched: false, value: action.value };
  }
  return state;
};

export const useInputValidation = (
  validateValue: (value: string) => boolean
) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const hasInitialValue = (value: string) => {
    dispatch({ type: "INITIAL_VALUE", value });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    hasInitialValue,
  };
};
