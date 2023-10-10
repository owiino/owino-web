import React, { Fragment, useState, useEffect } from "react";
import { InputCheckbox } from "../../shared/UI/InputCheckbox";

interface QuickSalesProps {
  onCheckQuickSales: (checkedQuickSales: boolean) => void;
}

export const AddProductQuickSales: React.FC<QuickSalesProps> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxChangeHandler = () => {
    setIsChecked(() => !isChecked);
  };

  useEffect(() => {
    const quickSalesHandler = () => {
      const quickSales: boolean = isChecked;
      props.onCheckQuickSales(quickSales);
    };
    quickSalesHandler();
  }, [isChecked == true]);

  return (
    <Fragment>
      <div className="space-y-2">
        <div>
          <label className="text-gray-700 text-lg font-semibold">
            Quick Sales
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <InputCheckbox
            checked={isChecked}
            onChange={checkboxChangeHandler}
            className="focus:ring-primary"
            label="Boost your sales @ 5,000 ugx"
          />
        </div>
      </div>
    </Fragment>
  );
};
