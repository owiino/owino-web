import { productActions } from "../index";
import { TAddProduct, TNewProduct } from "../../types/product";

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

export const ClearProduct = () => {
  localStorage.clear();
  return async (dispatch: any) => {
    await dispatch(productActions.clear());
  };
};
