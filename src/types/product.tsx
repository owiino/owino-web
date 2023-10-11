import { TSelectedLocation } from "./location";

export type TProductInputField = {
  type: "select" | "custom";
  label: string;
  dataList: any[];
  onSelect: (value: any) => void;
};

type TFile = {
  content: any;
  name: string;
  type: string;
};

export type TProductBasicInfo = {
  location: TSelectedLocation;
  category: string;
  imageList: TFile[];
};

export type TAddProduct = {
  basicInfo: TProductBasicInfo;
};

export type TNewProduct = {
  id: number;
  category: string;
  location: TSelectedLocation;
  images: any[];
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type TGetProduct = {
  productId: number;
  sellerId: number;
  productName: string;
  // productPrice: number;
  productImages: any[];
  createdAt: string;
  updatedAt: string;
};
