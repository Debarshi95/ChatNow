/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const FormInput = ({ label, placeholder, onChange, name = '', type = 'text' }) => {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        id={label}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
