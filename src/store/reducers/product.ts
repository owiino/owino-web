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
  newProductImageList: TFile[];
  basicInfo: {
    location: TSelectedLocation;
    category: string;
    imageList: TFile[];
  };
  newProduct: TNewProduct;
};

type TNewProductImageListPayload = {
  newProductImageList: TFile[];
};

const initialState: TAddProduct = {
  newProductImageList: [],
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
    updateNewProductImageList(
      state,
      action: PayloadAction<TNewProductImageListPayload>
    ) {
      console.log("update product image list");
      state.newProductImageList = action.payload.newProductImageList;
    },
    clear(state) {
      state.basicInfo = initialState.basicInfo;
      state.newProduct = initialState.newProduct;
      state.newProductImageList = initialState.newProductImageList;
    },
  },
});

export const { updateBasicInfo, clear } = productSlice.actions;

export default productSlice.reducer;
