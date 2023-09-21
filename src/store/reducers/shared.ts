import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TShared } from "../../types/shared";
import { TCurrentWindowWidth } from "../../types/shared";

const initialState: TShared = {
  currentWindowWidth: 0,
};

export const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    updateWidth(state, action: PayloadAction<TCurrentWindowWidth>) {
      state.currentWindowWidth = action.payload.currentWindowWidth;
    },
    clearWidth(state) {
      state.currentWindowWidth = 0;
    },
  },
});

export default sharedSlice.reducer;
