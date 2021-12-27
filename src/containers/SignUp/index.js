import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { requestSignup } from '../../store/slices/auth';
import FormInput from '../../components/FormInput';
import routes from '../../utils/routes';
import { validateEmail, validatePassword, validateUsername } from '../../utils/formValidation';
import { formatFirebaseError, makeClasses } from '../../utils';
import SubmittingButton from '../../components/SubmittingButton';

const SignUp = () => {
  const dispatch = useDispatch();

  const handleSignUp = async (formData, { setSubmitting, resetForm, setErrors }) => {
    const { username, email, password } = formData;
    try {
      setSubmitting(true);
      await dispatch(requestSignup({ username, email, password })).unwrap();
    } catch (error) {
      const err = formatFirebaseError(error);
      setErrors({ auth: err });
      resetForm();
      setSubmitting(false);
    }
  };
  return (
    <div
      className={makeClasses(
        'content-container',
        'w-full mx-auto',
        'flex justify-center items-center h-screen'
      )}
    >
      <div className={makeClasses('max-w-md', 'mb-8')}>
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          onSubmit={handleSignUp}
          validationSchema={Yup.object({
            username: validateUsername(),
            email: validateEmail(),
            password: validatePassword(),
          })}
        >
          {({ handleSubmit, isSubmitting, errors }) => (
            <form
              className={makeClasses('px-4 py-3')}
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <h4
                className={makeClasses(
                  'text-center',
                  'font-medium text-black',
                  'text-lg sm:text-xl mb-10'
                )}
              >
                Sign up with ChatNow to get started
              </h4>
              <div className={makeClasses('mb-2')}>
                <FormInput placeholder="Username" type="text" name="username" />
              </div>
              <div className={makeClasses('mb-2')}>
                <FormInput placeholder="johndoe@email.com" type="email" name="email" />
              </div>
              <div className={makeClasses('mb-5')}>
                <FormInput placeholder="******************" type="password" name="password" />
              </div>
              <div className={makeClasses('flex items-center justify-center')}>
                <SubmittingButton
                  isSubmitting={isSubmitting}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                />
              </div>
              <div>
                {errors?.auth && (
                  <p className={makeClasses('text-red-700 text-base text-center')}>{errors.auth}</p>
                )}
              </div>
            </form>
          )}
        </Formik>
        <p className={makeClasses('text-center text-slate-600 text-base')}>
          Registered?{' '}
          <Link to={routes.home.route} className={makeClasses('font-semibold')}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
