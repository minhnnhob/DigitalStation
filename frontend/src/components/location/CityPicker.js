import React from 'react';
import { RegionDropdown } from 'react-country-region-selector';

const CityPicker = ({
  country,
  value,
  onChange,
  placeholder = 'Select City',
  className = '',
  disabled = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor="city" className="block font-medium text-gray-white mb-1">
        City
      </label>
      <RegionDropdown
        id="city"
        country={country}
        value={value}
        onChange={(val) => onChange(val)}
        disabled={disabled || !country}
        classes="bg-bg-pf mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
        countryValueType="short"
        valueType="short"
      />
    </div>
  );
};

export default CityPicker;