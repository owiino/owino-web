import React, { Fragment, useState } from "react";
import { InputSelect } from "../../shared/UI/InputSelect";
import categories from "../../../data/productCategories.json";
import { TSubCategory, TCategory } from "../../../types/category";

const initialSubCategory: TSubCategory = {
  name: "",
  subcategories: [],
};

const initialCategory: TCategory = {
  name: "",
  subcategories: [],
};

interface Props {
  onSelect: (value: any) => void;
}

export const ProductCategorySelector: React.FC<Props> = (props) => {
  const productCategories = categories.categories;
  const [category, setCategory] = useState<TCategory>(initialCategory);
  const [subCategory, setSubCategory] =
    useState<TSubCategory>(initialSubCategory);
  const [showCategorySelect, setShowCategorySelect] = useState<boolean>(true);
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const selectedCategoryString = (subcategoryName: string): string => {
    for (const category of productCategories) {
      for (const subcategory of category.subcategories) {
        if (subcategory.name === subcategoryName) {
          return `${category.name}, ${subcategory.name}`;
        }
      }
    }
    return "";
  };

  const onCategorySelectHandler = (category: TCategory) => {
    setCategory(() => category);
    setShowCategorySelect(() => false);
    setSubCategory(() => category);
  };

  const onSubCategorySelectHandler = (subCategory: TSubCategory) => {
    setSubCategory(() => subCategory);
    setShowCategorySelect(() => true);
    setSelectedLabel(() => subCategory.name);
    setCategory(() => initialCategory);

    const categoryString = selectedCategoryString(subCategory.name);
    console.log("categoryString", categoryString);
    // parse data to parent component
    props.onSelect(categoryString);
  };

  const optionListHandler = () => {
    if (category.subcategories[0]) return subCategory.subcategories;
    return productCategories;
  };

  return (
    <Fragment>
      <div className="w-full space-y-1 mb-1">
        <label htmlFor="category" className="text-gray-800">
          Category
        </label>
        {/* select product category */}
        {showCategorySelect && (
          <InputSelect
            label={
              showCategorySelect
                ? selectedLabel
                  ? selectedLabel
                  : "Category"
                : ""
            }
            options={optionListHandler()}
            onSelect={onCategorySelectHandler}
            showOptionList={false}
          />
        )}
        {/* select product subcategory */}
        {!showCategorySelect && (
          <InputSelect
            label={selectedLabel}
            options={optionListHandler()}
            onSelect={onSubCategorySelectHandler}
            showOptionList={true}
          />
        )}
      </div>
    </Fragment>
  );
};
