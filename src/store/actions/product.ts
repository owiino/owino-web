import { productActions } from "../index";
import { TAddProduct, TNewProduct, TGetProduct } from "../../types/product";

export const updateProductBasicInfo = (productBasicInfo: TAddProduct) => {
  localStorage.setItem("productBasicInfo", JSON.stringify(productBasicInfo));
  return async (dispatch: any) => {
    await dispatch(productActions.updateBasicInfo(productBasicInfo));
  };
};

export const updateNewProduct = (newProduct: TNewProduct) => {
  localStorage.setItem("newProduct", JSON.stringify(newProduct));
  return async (dispatch: any) => {
    await dispatch(productActions.updateNewProduct(newProduct));
  };
};

type TFile = {
  content: any;
  name: string;
  type: string;
};

export const updateNewProductImageList = (newProductImageList: TFile[]) => {
  localStorage.setItem(
    "newProductImageList",
    JSON.stringify(newProductImageList)
  );
  return async (dispatch: any) => {
    await dispatch(
      productActions.updateNewProductImageList({
        newProductImageList: newProductImageList,
      })
    );
  };
};

export const updateCurrentProductOnPage = (product: TGetProduct) => {
  localStorage.setItem("currentProductOnPage", JSON.stringify(product));
  return async (dispatch: any) => {
    await dispatch(
      productActions.updateCurrentProductOnPage({
        currentProductOnPage: product,
      })
    );
  };
};

export const ClearProduct = () => {
  localStorage.clear();
  return async (dispatch: any) => {
    await dispatch(productActions.clear());
  };
};
