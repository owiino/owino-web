import React, { Fragment, useState } from "react";
import { ProductFormBuilder } from "../ProductFormBuilder";
import { TProductInputField } from "../../../../types/product";
import phoneJsonData from "./phone.json";
import { convertToNameObjectArray } from "../../../../utils";
import {
  showCardNotification,
  hideCardNotification,
} from "../../../../store/actions/notification";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../shared/UI/Button";
import { TProductBasicInfo } from "../../../../types/product";
import { useMutation } from "@tanstack/react-query";
import { postProduct } from "../../../../API/product";
import { Spinner } from "../../../shared/UI/Loader";
import { updateNewProduct } from "../../../../store/actions/product";
import { TSelectedLocation } from "../../../../types/location";

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

interface Contact {
  phoneNumber: string;
  name: string;
}

interface Delivery {
  location: TSelectedLocation;
  name: string;
  deliveryDurationFrom: number;
  deliveryDurationTo: number;
  chargesDelivery: boolean;
  deliveryCharge: number;
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
  const [formError, setFormError] = useState<string>("");
  const [contact, setContact] = useState<Contact>({
    phoneNumber: "",
    name: "",
  });
  const [description, setDescription] = useState<string>("");
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [quickSales, setQuickSales] = useState<boolean | null>(null);
  const dispatch: any = useDispatch();
  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const userId: number = useSelector((state: any) => state.auth.user.userId);
  const productBasicInfo: TProductBasicInfo = useSelector(
    (state: any) => state.product.basicInfo
  );

  const contactChangeHandler = (contact: Contact) => {
    setContact(() => contact);
  };

  const descriptionChangeHandler = (description: string) => {
    setDescription(() => description);
  };
  const onSaveDeliveryHandler = (delivery: Delivery) => {
    setDelivery(() => delivery);
  };
  const onCheckQuickSalesHandler = (checkedQuickSales: boolean) => {
    setQuickSales(() => checkedQuickSales);
  };

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
        setFormError(`Please select ${key}`);
        return false;
      }
    }
    return true;
  };

  console.log("error");
  console.log(formError);

  const { isLoading, mutate } = useMutation({
    mutationFn: postProduct,
    onSuccess: (data: any) => {
      dispatch(updateNewProduct(data.data.newProduct));
      dispatch(
        showCardNotification({ type: "success", message: data.message })
      );
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
    onError: (error: any) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });

  const submitPhoneDataHandler = () => {
    const imageList = productBasicInfo.imageList;
    const formData = new FormData();
    if (!validatePhoneData(phoneData)) return;

    // TODO: to validate location, category and description

    formData.append("userId", JSON.stringify(userId));
    formData.append("ProductName", phoneData.model);
    formData.append("productCategory", productBasicInfo.category);
    formData.append("ProductDetailedInfo", JSON.stringify(phoneData));
    formData.append("location", JSON.stringify(productBasicInfo.location));
    formData.append("description", description);
    formData.append("contact", JSON.stringify(contact));
    formData.append("delivery", JSON.stringify(delivery));
    formData.append("quickSales", JSON.stringify(quickSales));

    for (let i = 0; i < imageList.length; i++) {
      formData.append(
        "files",
        new Blob([imageList[i].content], {
          type: imageList[i].type,
        }),
        imageList[i].name
      );
    }

    mutate({ formData: formData, accessToken: accessToken });
    localStorage.removeItem("productBasicInfo");
  };

  console.log("delivery", delivery);

  return (
    <Fragment>
      <div className="w-[90%] xs:w-[448px] sm:w-[500px] md:w-[640px] space-y-4">
        <ProductFormBuilder
          fieldList={phoneFieldList}
          descriptionChangeHandler={descriptionChangeHandler}
          contactChangeHandler={contactChangeHandler}
          onSaveDelivery={onSaveDeliveryHandler}
          onCheckQuickSales={onCheckQuickSalesHandler}
        />
        <div
          className="w-full bg-gray-50 rounded-md grid place-items-center
              p-4 gap-3"
        >
          <div>
            <p className="text-gray-700">
              By clicking post, you agree to our terms of service
            </p>
          </div>
          {!isLoading && (
            <Button
              onClick={() => submitPhoneDataHandler()}
              className="w-56s w-full"
            >
              Post
            </Button>
          )}
          {isLoading && (
            <div
              className="py-[6px] font-semibold text-gray-100 bg-primary
               w-56s w-full grid place-items-center rounded"
            >
              <Spinner label="Posting" className="w-5 h-5 text-gray-100" />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
