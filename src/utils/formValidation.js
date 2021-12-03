import * as Yup from 'yup';

export const validateEmail = () => {
  return Yup.string().trim().email('Invalid Email').required('Email is required');
};

export const validateUsername = () => {
  return Yup.string()
    .trim()
    .min(6, 'Username should have atleast six characters')
    .required('Username is required');
};

export const validatePassword = () => {
  return Yup.string()
    .trim()
    .min(6, 'Password should have atleast six characters')
    .required('Password in required');
};
