export type TProductInputField = {
  type: "select" | "custom";
  label: string;
  dataList: any[];
  onSelect: (value: any) => void;
};
