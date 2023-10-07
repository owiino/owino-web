export type TChildSubCategory = {
  name: string;
};

export type TSubCategory = {
  name: string;
  subcategories: { name: string }[];
};

export type TCategory = {
  name: string;
  subcategories: TSubCategory[];
};

export type TProductCategories = {
  categories: TCategory[];
};
