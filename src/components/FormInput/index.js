/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useField } from 'formik';

const FormInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      {label ? (
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor={label}>
          {label}
        </label>
      ) : null}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={props.placeholder}
        id={props.id || label}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-700 my-1 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
