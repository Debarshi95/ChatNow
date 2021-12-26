import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FormInput from '../../components/FormInput';
import { requestSignIn } from '../../store/slices/auth';
import routes from '../../utils/routes';
import { validateEmail, validatePassword } from '../../utils/formValidation';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = async (formData) => {
    const { email, password } = formData;

    const res = await dispatch(requestSignIn({ email, password })).unwrap();
    if (res?.user) {
      history.push(routes.chat.route);
    }
  };
  return (
    <div className="content-container w-full md:w-3/5 mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-sm">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSignIn}
          validationSchema={Yup.object({
            email: validateEmail(),
            password: validatePassword(),
          })}
        >
          <Form className="px-4 md:px-8 pt-6 pb-8 mb-4" autoComplete="off" noValidate>
            <h4 className="text-center font-medium text-blue-500 text-lg mt-6 mb-8">
              Sign in to your ChatNow account to continue
            </h4>
            <div className="mb-4">
              <FormInput placeholder="johndoe@email.com" type="email" name="email" />
            </div>
            <div className="mb-5">
              <FormInput placeholder="******************" type="password" name="password" />
            </div>
            <div className="flex items-center justify-center">
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
          Not Registered?{' '}
          <Link to={routes.signup.route} className="font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
