import React, { Fragment, useState } from "react";
import { ProductFormBuilder } from "../ProductFormBuilder";
// import { InputSelect } from "../../../shared/UI/InputSelect";
import { TProductInputField } from "../../../../types/product";
import phoneJsonData from "./phone.json";
import { convertToNameObjectArray } from "../../../../utils";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../../store/actions/notification";
import { useDispatch } from "react-redux";

interface PhoneDataState {
  model: string;
  ram: string;
  storage: string;
  battery: string;
  size: string;
  display: string;
  resolution: string;
  network: string;
  sim: string;
  os: string;
}

export const PhoneForm: React.FC = () => {
  const phoneDataJSON = phoneJsonData;
  const [phoneData, setPhoneData] = useState<PhoneDataState>({
    model: "",
    ram: "",
    storage: "",
    battery: "",
    size: "",
    display: "",
    resolution: "",
    network: "",
    sim: "",
    os: "",
  });
  const [error, setError] = useState<string>("");
  const dispatch: any = useDispatch();

  // TODO: Add string "other" to all json data for products
  // TODO: validate to ensure that all fields have values
  // TODO: create functions 1-save to local storage 2-save to redux store

  interface SelectedValue {
    name: string;
  }

  const updateState = (property: keyof PhoneDataState, value: string) => {
    setPhoneData({ ...phoneData, [property]: value });
  };

  const modelSelectHandler = (value: SelectedValue) => {
    updateState("model", value.name);
  };
  const ramSelectHandler = (value: SelectedValue) => {
    updateState("ram", value.name);
  };
  const storageSelectHandler = (value: SelectedValue) => {
    updateState("storage", value.name);
  };
  const batterySelectHandler = (value: SelectedValue) => {
    updateState("battery", value.name);
  };
  const sizeSelectHandler = (value: SelectedValue) => {
    updateState("size", value.name);
  };
  const displaySelectHandler = (value: SelectedValue) => {
    updateState("display", value.name);
  };
  const resolutionSelectHandler = (value: SelectedValue) => {
    updateState("resolution", value.name);
  };
  const networkSelectHandler = (value: SelectedValue) => {
    updateState("network", value.name);
  };
  const simSelectHandler = (value: SelectedValue) => {
    updateState("sim", value.name);
  };
  const osSelectHandler = (value: SelectedValue) => {
    updateState("os", value.name);
  };

  const phoneFieldList: TProductInputField[] = [
    {
      label: "Model",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.models),
      onSelect: modelSelectHandler,
    },
    {
      label: "RAM",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.ram),
      onSelect: ramSelectHandler,
    },
    {
      label: "Storage",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.storage),
      onSelect: storageSelectHandler,
    },
    {
      label: "Battery",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.battery),
      onSelect: batterySelectHandler,
    },
    {
      label: "Size",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.size),
      onSelect: sizeSelectHandler,
    },
    {
      label: "Display",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.display),
      onSelect: displaySelectHandler,
    },
    {
      label: "Resolution",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.resolutions),
      onSelect: resolutionSelectHandler,
    },
    {
      label: "Network",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.network),
      onSelect: networkSelectHandler,
    },
    {
      label: "SIM",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.SIM),
      onSelect: simSelectHandler,
    },
    {
      label: "Operating System",
      type: "select",
      dataList: convertToNameObjectArray(phoneDataJSON.operatingSystems),
      onSelect: osSelectHandler,
    },
  ];

  console.log("phoneData.model");
  console.log(phoneData.model);

  const validatePhoneData = (phoneData: PhoneDataState): boolean => {
    for (const key in phoneData) {
      if (phoneData[key as keyof PhoneDataState] === "") {
        dispatch(
          showCardNotification({
            type: "error",
            message: "please check form for errors",
          })
        );
        setTimeout(() => {
          dispatch(hideCardNotification());
        }, 5000);
        setError(`Please select ${key}`);
        return false;
      }
    }
    return true;
  };

  console.log("validatePhoneData");
  console.log(validatePhoneData);

  console.log("error");
  console.log(error);

  return (
    <Fragment>
      <ProductFormBuilder fieldList={phoneFieldList} />
    </Fragment>
  );
};
