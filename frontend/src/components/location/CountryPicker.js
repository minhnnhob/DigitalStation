import React from "react";
import { CountryDropdown } from "react-country-region-selector";

const CountryPicker = ({
  value,
  onChange,
  placeholder = "Select Country",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor="country"
        className="block  font-medium text-white mb-1"
      >
        Country
      </label>
      <CountryDropdown
        id="country"
        value={value}
        onChange={(val) => onChange(val)}
        disabled={disabled}
        classes=" bg-bg-pf mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
        valueType="short"
        priorityOptions={["VN", "US", "GB"]}
      />
    </div>
  );
};

export default CountryPicker;
