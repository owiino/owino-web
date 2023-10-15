import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../../types/auth";

type TUserInitialState = {
  seller: TUser;
};

const initialState: TUserInitialState = {
  seller: {
    userId: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "seller",
    imageUrl: null,
    createdAt: "",
    updatedAt: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSeller(state, action: PayloadAction<{ seller: TUser }>) {
      state.seller = action.payload.seller;
    },
    clear(state) {
      state.seller = initialState.seller;
    },
  },
});

export default userSlice.reducer;
