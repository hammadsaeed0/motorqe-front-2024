// Dropdown.js

import React, { useState } from 'react';

const Option = ({ options, label }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className=" ">
      <label className="block text-sm text-left  font-medium  text-textColor">{label}</label>
      <select
        className="mt-1 bg-[#FEFBFB] text-gray-600 p-2 border rounded-md w-full"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Option;