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

export type TAddProduct = {
  basicInfo: {
    location: TSelectedLocation;
    category: string;
    imageList: TFile[];
  };
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
