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

  const showFocusUnderline = showLocationData || showDivision;

  return (
    <Fragment>
      <div className="w-full relative">
        <div className="text-gray-800 relative">
          <label htmlFor="location">{props.label && props.label}</label>
          <div
            className="border-gray-600 rounded-t flex
            items-center justify-between p-2 bg-gray-300 
            text-sm mt-1"
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
          <div className="bottom-[0.5px] h-[2px] bg-gray-400 x-10" />
          {showFocusUnderline && (
            <div
              className="absolute bottom-[0.5px] inset-x-0 h-[3px] bg-primary
              animate-radiate z-40"
            />
          )}
        </div>

        {showLocationData && (
          <div
            className="animate-opacityZeroToFull absolute top-[70px] w-full
              bg-gray-100 z-[60] shadow-2xl p-4 rounded-b border-[1px]
              border-gray-300 space-y-2 max-h-60 overflow-x-hidden"
          >
            {locationData.map((location: TLocation, index: number) => {
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
        )}

        {showDivision && (
          <ul
            className="animate-opacityZeroToFull absolute top-[70px] w-full
          bg-gray-100 z-[60] shadow-2xl p-4 rounded-b border-[1px]
          border-gray-300 space-y-2 max-h-60 overflow-x-hidden"
          >
            {selectedDivisionList.map((division: string, index: number) => {
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
        )}
      </div>
    </Fragment>
  );
};
