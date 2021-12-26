import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { requestSignup } from '../../store/slices/auth';
import FormInput from '../../components/FormInput';
import routes from '../../utils/routes';
import { validateEmail, validatePassword, validateUsername } from '../../utils/formValidation';

const SignUp = () => {
  const dispatch = useDispatch();

  const handleSignUp = async (formData) => {
    const { username, email, password } = formData;
    try {
      await dispatch(requestSignup({ username, email, password })).unwrap();
    } catch (error) {
      //
    }
  };
  return (
    <div className="w-full content-container md:w-3/5 mx-auto flex justify-center items-center flex-1 h-screen max-h-100vh">
      <div className="w-full max-w-sm">
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          onSubmit={handleSignUp}
          validationSchema={Yup.object({
            username: validateUsername(),
            email: validateEmail(),
            password: validatePassword(),
          })}
        >
          <Form className="px-4 md:px-8 pt-6 pb-8 mb-4" autoComplete="off" noValidate>
            <h4 className="text-center font-medium text-blue-500 text-lg mt-4 mb-6">
              Sign up with ChatNow to get started
            </h4>
            <div className="mb-2">
              <FormInput placeholder="Username" type="text" name="username" />
            </div>
            <div className="mb-2">
              <FormInput placeholder="johndoe@email.com" type="email" name="email" />
            </div>
            <div className="mb-5">
              <FormInput placeholder="******************" type="password" name="password" />
            </div>
            <div className="flex items-center justify-center ">
              <button
                className="bg-blue-500 flex-1 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
        <p className="text-center text-blue-500 text-base">
          Registered?{' '}
          <Link to={routes.home.route} className="font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
