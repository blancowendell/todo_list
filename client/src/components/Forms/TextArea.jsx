import React from 'react';

const InputTextArea = ({ label, value, onChange, placeholder }) => (
  <div className="relative w-full">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder=" "
      rows={4}
      className="peer w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    />
    <label className="absolute left-3 -top-2 text-gray-500 text-sm bg-white px-1 transition-all peer-focus:text-blue-500 peer-focus:text-sm">
      {label}
    </label>
  </div>
);

export default InputTextArea;
