export type TDistrict = {
  name: string;
  divisions: string[];
};

export type TLocation = {
  region: string;
  districts: TDistrict[];
};

export type TSelectedLocation = {
  region: string;
  district: string;
  division: string;
};
