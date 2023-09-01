export type TInputState = {
  value: string;
  isTouched: Boolean;
};

export type TReducerAction =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" }
  | { type: "INITIAL_VALUE"; value: string };
