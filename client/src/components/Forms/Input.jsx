import React from 'react';

const InputField = ({ label, value, onChange, placeholder }) => (
  <div className="relative w-full">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      className="w-full h-10 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 peer"
    />
    <label className="absolute left-3 -top-2 text-gray-500 text-sm bg-white px-1 transition-all peer-focus:text-blue-500 peer-focus:text-sm">
      {label}
    </label>
  </div>
);

export default InputField;
