import React, { Fragment, useState, useEffect } from "react";
import { InputSelect } from "../../shared/UI/InputSelect";
import { TProductInputField } from "../../../types/product";
import { InputField } from "../../shared/UI/InputField";
import { InputTextArea } from "../../shared/UI/InputTextArea";
import { AddProductDelivery } from "./forms/AddProductDelivery";
import { TSelectedLocation } from "../../../types/location";
import { useSelector } from "react-redux";
import { TUser } from "../../../types/auth";
import { AddProductQuickSales } from "./AddProductQuickSales";
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

interface FormBuilderProps {
  fieldList: TProductInputField[];
  descriptionChangeHandler: (value: string) => void;
  contactChangeHandler: (value: Contact) => void;
  onSaveDelivery: (delivery: Delivery) => void;
  onCheckQuickSales: (checkedQuickSales: boolean) => void;
}

export const ProductFormBuilder: React.FC<FormBuilderProps> = (props) => {
  const fields = props.fieldList;
  const user: TUser = useSelector((state: any) => state.auth.user);

  const [contact, setContact] = useState<Contact>({
    phoneNumber: user.phoneNumber,
    name: `${user.firstName} ${user.lastName}`,
  });

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);
  const [isValidDescription, setIsValidDescription] = useState<boolean>(false);
  const [descriptionCharacterNumber, setDescriptionCharacterNumber] =
    useState<number>(0);

  const phoneValueChangeHandler = (value: string) => {
    setContact({ ...contact, phoneNumber: value });
  };

  const isValidPhoneNumberHandler = (value: boolean) => {
    if (value) setIsValidPhoneNumber(() => true);
  };

  const descriptionValueChangeHandler = (value: string) => {
    if (!isValidDescription) return;
    if (value) props.descriptionChangeHandler(value);
  };

  const isValidDescriptionNumberHandler = (value: boolean) => {
    if (value) setIsValidDescription(() => true);
  };

  const validatePhoneNumber = (phoneNumber: string) =>
    phoneNumber.trim().startsWith("2567") && phoneNumber.trim().length === 12;

  const validateDescription = (description: string) => {
    const trimmedDescription = description.trim();
    setDescriptionCharacterNumber(() => description.length);
    return trimmedDescription !== "" && trimmedDescription.length <= 300;
  };

  const validateDefaultInput = (inputValue: string) => inputValue.trim() !== "";

  useEffect(() => {
    const contactValueHandler = () => {
      if (!isValidPhoneNumber) return;
      props.contactChangeHandler(contact);
    };
    contactValueHandler();
  }, []);

  return (
    <Fragment>
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-md">
          <div className="w-full p-4 sm:grid grid-cols-2 gap-3">
            {fields.map((field, index) => {
              if (field.type === "select") {
                return (
                  <div key={index} className="space-y-1">
                    <label className="text-gray-700">{field.label}</label>
                    <InputSelect
                      label={field.label}
                      onSelect={field.onSelect}
                      showOptionList={false}
                      options={field.dataList}
                    />
                  </div>
                );
              }
              if (field.type === "custom") {
                return (
                  <div key={index}>
                    <InputField
                      label={field.label}
                      type="text"
                      required={true}
                      placeholder={field.label}
                      validateInputValue={validateDefaultInput}
                      inputValueHandler={field.onSelect}
                      errorMessage=""
                      className="w-full"
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="w-full p-4">
            <InputTextArea
              label="Description"
              required={true}
              placeholder="Description*"
              validateInputValue={validateDescription}
              inputValueHandler={descriptionValueChangeHandler}
              isValidInputHandler={isValidDescriptionNumberHandler}
              errorMessage="Please provide a valid description"
            />
            <div className="flex items-center  justify-end">
              <span className="text-sm text-gray-600">
                {descriptionCharacterNumber} / 300
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-md p-4 space-y-2">
          <label
            htmlFor="contact"
            className="text-gray-700 text-lg font-semibold"
          >
            Contact
          </label>
          <div
            className="w-full flex flex-col items-center justify-center
             sm:flex-row gap-3"
          >
            <InputField
              label="Your phone number"
              type="text"
              value={user.phoneNumber}
              required={true}
              placeholder={user.phoneNumber}
              validateInputValue={validatePhoneNumber}
              inputValueHandler={phoneValueChangeHandler}
              isValidInputHandler={isValidPhoneNumberHandler}
              errorMessage="Please provide valid phone number"
              className="w-full"
            />
            <InputField
              label="Name"
              type="text"
              required={true}
              placeholder={`${user.firstName} ${user.lastName}`}
              validateInputValue={(value: string) => {
                if (value) return true;
                return false;
              }}
              inputValueHandler={(value: string) => {
                if (value) value;
              }}
              errorMessage=""
              disabled={true}
              className="w-full text-gray-600 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div className="bg-gray-50 rounded-md p-4">
          <AddProductDelivery onSave={props.onSaveDelivery} />
        </div>
        <div className="bg-gray-50 rounded-md p-4">
          <AddProductQuickSales onCheckQuickSales={props.onCheckQuickSales} />
        </div>
      </div>
    </Fragment>
  );
};
