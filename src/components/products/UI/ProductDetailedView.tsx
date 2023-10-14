import React, { Fragment } from "react";

interface ProductDetailedViewProps {
  productDetailedInfo: Record<string, string>;
}

export const ProductDetailedView: React.FC<ProductDetailedViewProps> = (
  props
) => {
  const { productDetailedInfo } = props;

  if (!productDetailedInfo) return;

  return (
    <Fragment>
      <ul className="grid grid-cols-2 gap-3">
        {Object?.entries(productDetailedInfo)?.map(([key, value]) => (
          <li key={key} className="flex flex-col items-start justify-center">
            <span className="text-gray-500 text-[12px] uppercase">{key}</span>
            <span className="text-gray-800">{value}</span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
