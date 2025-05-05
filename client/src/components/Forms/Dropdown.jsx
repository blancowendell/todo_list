import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const Dropdown = ({ label, value, onChange, options }) => (
  <div className="relative w-full">
    <Select
      value={value}
      onChange={onChange}
      style={{height: 50}}
      placeholder=" "
      className="w-full peer h-10"
      popupClassName="z-50"
      dropdownStyle={{ lineHeight: '2rem', padding: '0.5rem 0' }}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value} className="h-10 text-sm">
          {option.label}
        </Option>
      ))}
    </Select>
    <label className="absolute left-3 top-[-8px] text-gray-500 text-sm bg-white px-1 transition-all peer-focus:text-blue-500 peer-focus:text-sm">
      {label}
    </label>
  </div>
);

export default Dropdown;
