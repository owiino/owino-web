import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSelectedLocation } from "../../types/location";

type TFile = {
  content: any;
  name: string;
  type: string;
};

type TNewProduct = {
  id: number;
  category: string;
  location: TSelectedLocation;
  images: any[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

type TAddProduct = {
  basicInfo: {
    location: TSelectedLocation;
    category: string;
    imageList: TFile[];
  };
  newProduct: TNewProduct;
};

const initialState: TAddProduct = {
  basicInfo: {
    location: { region: "", district: "", division: "" },
    category: "",
    imageList: [],
  },
  newProduct: {
    id: 0,
    category: "",
    location: { region: "", district: "", division: "" },
    images: [],
    description: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateBasicInfo(state, action: PayloadAction<any>) {
      state.basicInfo = action.payload.basicInfo;
    },
    updateNewProduct(state, action: PayloadAction<any>) {
      state.newProduct = action.payload.newProduct;
    },
    clear(state) {
      state.basicInfo = initialState.basicInfo;
      state.newProduct = initialState.newProduct;
    },
  },
});

export const { updateBasicInfo, clear } = productSlice.actions;

export default productSlice.reducer;
