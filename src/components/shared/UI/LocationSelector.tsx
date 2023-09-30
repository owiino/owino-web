import React, { useState, Fragment } from "react";
import {
  TDistrict,
  TLocation,
  TSelectedLocation,
} from "../../../types/location";
import sprite from "../../../assets/icons/sprite.svg";

const locationData: TLocation[] = [
  {
    region: "central",
    districts: [
      {
        name: "Kampala",
        divisions: [
          "Kampala Central",
          "Kawempe",
          "Makindye",
          "Nakawa",
          "Rubaga",
        ],
      },
      {
        name: "Mukono",
        divisions: ["Mukono Municipality", "Buikwe", "Nakifuma", "Ntenjeru"],
      },
    ],
  },
  {
    region: "western",
    districts: [
      {
        name: "Kabarole",
        divisions: ["Fort Portal", "Kamwenge", "Bukuuku"],
      },
      {
        name: "Kasese",
        divisions: ["Kasese Municipality", "Kilembe", "Hima"],
      },
    ],
  },
];

interface LocationSelectorProps {
  onSelect: (district: TSelectedLocation) => void;
  label?: string;
}

// TODO: consider adding an overlay to close all lists

export const LocationSelector: React.FC<LocationSelectorProps> = (props) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<TDistrict>({
    name: "",
    divisions: [],
  });
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDivisionList, setSelectedDivisionList] = useState<string[]>(
    []
  );
  const [showLocationData, setShowLocationData] = useState<boolean>(false);
  const [showDivision, setShowDivision] = useState<boolean>(false);

  const selectDistrictHandler = (district: TDistrict) => {
    setSelectedDistrict(() => district);
    setSelectedDivisionList(() => district.divisions);
    setShowDivision(true);
    setShowLocationData(false);
  };

  const selectDivisionHandler = (division: string) => {
    setSelectedDivision(() => division);
    setShowDivision(false);
    props.onSelect({
      region: selectedRegion,
      district: selectedDistrict.name,
      division: division,
    });
  };

  return (
    <Fragment>
      <div className="w-full">
        <div className="space-y-1 text-gray-800">
          <label htmlFor="location">{props.label && props.label}</label>
          <div
            className="border-[2px] border-gray-600 rounded flex
           items-center justify-between p-2"
            onClick={() => setShowLocationData(true)}
          >
            {selectedDivision && <span>{selectedDivision}</span>}
            {!selectedDivision && (
              <span className="text-gray-600">{"location"}</span>
            )}
            <svg className="w-6 h-6 fill-gray-700 cursor-pointer">
              <use href={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </div>
        </div>

        <div>
          {showLocationData &&
            locationData.map((location: TLocation, index: number) => {
              return (
                <div key={index}>
                  <span className="font-bold">{location.region}</span>
                  <ul>
                    {location.districts.map(
                      (district: TDistrict, index: number) => {
                        return (
                          <li
                            onClick={() => {
                              selectDistrictHandler(district),
                                setSelectedRegion(location.region);
                            }}
                            className="cursor-pointer"
                            key={index}
                          >
                            {district.name}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              );
            })}
        </div>

        <ul>
          {showDivision &&
            selectedDivisionList.map((division: string, index: number) => {
              return (
                <li
                  onClick={() => selectDivisionHandler(division)}
                  className="cursor-pointer"
                  key={index}
                >
                  {division}
                </li>
              );
            })}
        </ul>
      </div>
    </Fragment>
  );
};
