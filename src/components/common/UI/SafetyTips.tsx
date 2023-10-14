import React, { Fragment } from "react";

export const SafetyTips: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-gray-50 p-4 w-full">
        <h2 className="text-center font-bold text-gray-800">Safety Tips</h2>
        <ul className="list-disc pl-6 text-gray-600 text-sm">
          <li className="mb-2">
            Avoid making payments in advance, including for delivery.
          </li>
          <li className="mb-2">Meet the seller at a safe, public location.</li>
          <li className="mb-2">
            Thoroughly inspect the item to ensure it meets your requirements.
          </li>
          <li className="mb-2">
            Upon delivery, verify that the received item matches your
            inspection.
          </li>
          <li className="mb-2">
            Only make the payment when you are completely satisfied.
          </li>
        </ul>
      </div>
    </Fragment>
  );
};
