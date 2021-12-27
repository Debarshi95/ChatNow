import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import FormInput from '../../components/FormInput';
import { requestSignIn } from '../../store/slices/auth';
import routes from '../../utils/routes';
import { validateEmail, validatePassword } from '../../utils/formValidation';
import { formatFirebaseError, makeClasses } from '../../utils';
import SubmittingButton from '../../components/SubmittingButton';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignIn = async (formData, { setErrors, setSubmitting, resetForm }) => {
    const { email, password } = formData;

    try {
      setSubmitting(true);
      const res = await dispatch(requestSignIn({ email, password })).unwrap();
      if (res?.user) {
        history.push(routes.chat.route);
      }
    } catch (error) {
      const err = formatFirebaseError(error);
      resetForm();
      setErrors({ auth: err });
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
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSignIn}
          validationSchema={Yup.object({
            email: validateEmail(),
            password: validatePassword(),
          })}
        >
          {({ isSubmitting, handleSubmit, errors }) => (
            <form
              className={makeClasses('px-4 md:px-8 py-3')}
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
                Sign in to your ChatNow account to continue
              </h4>
              <div className={makeClasses('mb-3')}>
                <FormInput placeholder="johndoe@email.com" type="email" name="email" />
              </div>
              <div className={makeClasses('mb-6')}>
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
          Not Registered?{' '}
          <Link to={routes.signup.route} className={makeClasses('font-semibold')}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
