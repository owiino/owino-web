import React, { Fragment, useEffect, useState } from "react";
import sprite from "../../../../assets/icons/sprite.svg";
import { Modal } from "../../../shared/UI/Modal";
import { InputSelect } from "../../../shared/UI/InputSelect";
import { TProductBasicInfo } from "../../../../types/product";
import { useSelector } from "react-redux";
import { InputField } from "../../../shared/UI/InputField";
import { Button } from "../../../shared/UI/Button";
import { TSelectedLocation } from "../../../../types/location";
import { LocationSelector } from "../../../shared/UI/LocationSelector";

const OpenModalElement: React.FC = () => {
  return (
    <Fragment>
      <div
        className="w-full h-12 rounded bg-gray-300 flex items-center 
         justify-start p-3 cursor-pointer gap-x-2"
      >
        <svg className="w-6 h-6 fill-primary">
          <use href={`${sprite}#icon-plus-small`}></use>
        </svg>
        <span className="text-gray-700 text-sm">Add delivery options</span>
      </div>
    </Fragment>
  );
};

interface Delivery {
  location: TSelectedLocation;
  name: string;
  deliveryDuration: {
    from: number;
    to: number;
  };
  chargesDelivery: boolean;
  deliveryCharge: number;
}

interface AddProductDeliveryProps {
  onSave: (delivery: Delivery) => void;
}

const deliveryInitialValue: Delivery = {
  location: { region: "", district: "", division: "" },
  name: "",
  deliveryDuration: {
    from: 0,
    to: 0,
  },
  chargesDelivery: false,
  deliveryCharge: 0,
};

export const AddProductDelivery: React.FC<AddProductDeliveryProps> = (
  props
) => {
  const productBasicInfo: TProductBasicInfo = useSelector(
    (state: any) => state.product.basicInfo
  );

  const productName = productBasicInfo.category.split(",")[1]?.trim();

  const [delivery, setDelivery] = useState<Delivery>(deliveryInitialValue);

  const [durationFrom, setDurationFrom] = useState<number>(0);
  const [durationTo, setDurationTo] = useState<number>(0);
  const [chargesDelivery, setChargesDelivery] = useState<boolean>(false);
  const [deliveryCharge, SetDeliveryCharge] = useState<number>(0);

  const deliveryNameValueChangeHandler = (name: string) => {
    setDelivery({ ...delivery, name: name });
  };
  const validateDeliveryName = (deliveryName: string) =>
    deliveryName.trim() !== "";

  const durationFromChangeHandler = (from: string) => {
    setDurationFrom(() => parseInt(from));
  };
  const validateDeliveryDurationFrom = (from: string) => {
    const durationFromTrimmed = from.trim();
    const durationFrom = parseInt(durationFromTrimmed);
    return Number.isInteger(durationFrom);
  };

  const durationToChangeHandler = (to: string) => {
    setDurationTo(() => parseInt(to));
  };

  const validateDeliveryDurationTo = (from: string) => {
    const durationToTrimmed = from.trim();
    const durationTo = parseInt(durationToTrimmed);
    return Number.isInteger(durationTo);
  };

  const selectLocationHandler = (location: TSelectedLocation) => {
    setDelivery({ ...delivery, location: location });
  };

  const onSelectChargeDeliveryHandler = (chargesDelivery: {
    name: string;
    chargesDelivery: boolean;
  }) => {
    setChargesDelivery(() => chargesDelivery.chargesDelivery);
  };

  const deliveryChargeChangeHandler = (deliveryCharge: string) => {
    console.log("deliveryCharge", deliveryCharge);
    SetDeliveryCharge(() => parseInt(deliveryCharge));
  };

  const validateDeliveryCharge = (from: string) => {
    const durationToTrimmed = from.trim();
    const durationTo = parseInt(durationToTrimmed);
    return Number.isInteger(durationTo);
  };

  const deliveryOptionList = [
    {
      name: "Delivery charge",
      chargesDelivery: true,
    },
    {
      name: "No delivery charge",
      chargesDelivery: false,
    },
  ];

  const onSaveHandler = () => {
    // TODO: validate delivery options here
    // TODO: fix save delivery properties to the parent
    setDelivery({ ...delivery, name: productName });
    setDelivery({
      ...delivery,
      deliveryDuration: { from: durationFrom, to: durationTo },
    });
    setDelivery({ ...delivery, deliveryCharge: deliveryCharge });
    setDelivery({ ...delivery, chargesDelivery: chargesDelivery });
    props.onSave(delivery);
  };

  useEffect(() => {
    // setDelivery({ ...delivery, name: productName });
    // setDelivery({
    //   ...delivery,
    //   deliveryDuration: { from: durationFrom, to: durationTo },
    // });
    // setDelivery({ ...delivery, chargesDelivery: chargesDelivery });
    // setDelivery({ ...delivery, deliveryCharge: deliveryCharge });

    console.log("Delivery use effect");
  }, [productName, durationFrom, durationTo, setDurationFrom, setDurationTo]);

  return (
    <Fragment>
      <div className="space-y-2">
        <label htmlFor="productDelivery" className="flex items-center gap-x-2">
          <svg className="w-7 h-7 fill-gray-dark-1">
            <use href={`${sprite}#icon-person-filled`}></use>
          </svg>
          <span>Delivery</span>
        </label>
        <Modal
          openModalElement={<OpenModalElement />}
          onModalClose={() => {}}
          className="w-[90%] xs:w-96 h-auto sm:max-h-[80vh] overflow-x-hidden mt-8"
        >
          <form className="p-8 mt-4 space-y-4">
            <div className="flex items-center gap-x-2">
              <svg className="w-7 h-7 fill-gray-dark-1">
                <use href={`${sprite}#icon-person-filled`}></use>
              </svg>
              <span>Add delivery option</span>
            </div>
            <InputField
              label="Name delivery"
              type="text"
              value={productName}
              required={true}
              placeholder="Name delivery"
              validateInputValue={validateDeliveryName}
              inputValueHandler={deliveryNameValueChangeHandler}
              errorMessage="Please valid name for the delivery"
              className="w-full"
            />
            <LocationSelector onSelect={selectLocationHandler} />
            <div>
              <div>
                <span className="text-gray-800 text-sm">
                  How many days it takes to deliver
                </span>
              </div>
              <div className="flex item-center gap-x-3">
                <InputField
                  label="From"
                  type="text"
                  required={true}
                  placeholder="From"
                  validateInputValue={validateDeliveryDurationFrom}
                  inputValueHandler={durationFromChangeHandler}
                  errorMessage="Please valid number of days"
                  className="w-full"
                />
                <InputField
                  label="To"
                  type="text"
                  required={true}
                  placeholder="To"
                  validateInputValue={validateDeliveryDurationTo}
                  inputValueHandler={durationToChangeHandler}
                  errorMessage="Please valid number of days"
                  className="w-full"
                />
              </div>
            </div>
            {!chargesDelivery && (
              <InputSelect
                label="Do you charge for delivery"
                onSelect={onSelectChargeDeliveryHandler}
                options={deliveryOptionList}
                showOptionList={false}
              />
            )}
            {chargesDelivery && (
              <InputField
                label="Delivery charge fee(UGX)"
                type="text"
                required={true}
                placeholder="Delivery charge"
                validateInputValue={validateDeliveryCharge}
                inputValueHandler={deliveryChargeChangeHandler}
                errorMessage="Please valid delivery charge"
                className="w-full"
              />
            )}
            <Button onClick={() => onSaveHandler()} className="w-full">
              Save
            </Button>
          </form>
        </Modal>
      </div>
    </Fragment>
  );
};
