import React, { Fragment } from "react";
import { InputSelect } from "../../shared/UI/InputSelect";
import { TProductInputField } from "../../../types/product";

interface FormBuilderProps {
  fieldList: TProductInputField[];
}

export const ProductFormBuilder: React.FC<FormBuilderProps> = (props) => {
  const fields = props.fieldList;

  return (
    <Fragment>
      <div className="w-[90%] xs:w-[448px] sm:w-[500px] md:w-[640px] bg-gray-50 rounded-md">
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
              return <div key={index}>Custom field</div>;
            }
          })}
        </div>
        {/* Description textarea here */}
        {/* Contact form here */}
        {/* Delivery form here */}
        {/* Quick sales form here */}
        {/* Submit form action(API REQUEST)  //??? to be revised */}
      </div>
    </Fragment>
  );
};
