import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../store/slices/auth';
import FormInput from '../../components/FormInput';
import routes from '../../utils/routes';

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();

  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    const { username, email, password } = formData;
    if (username === '' || email === '' || password === '') return;
    try {
      await dispatch(signUp({ username, email, password })).unwrap();
    } catch (error) {
      //
    }
  };
  return (
    <div className="w-full md:w-3/5 mx-auto flex justify-center items-center flex-1 h-screen max-h-100vh">
      <div className="w-full max-w-sm">
        <form className="px-4 md:px-8 pt-6 pb-8 mb-4" autoComplete="off">
          <h4 className="text-center font-medium text-blue-500 text-lg mt-4 mb-6">
            Sign up with ChatNow to get started
          </h4>
          <div className="mb-2">
            <FormInput
              label="Username"
              placeholder="Username"
              type="text"
              onChange={handleForm}
              name="username"
            />
          </div>
          <div className="mb-2">
            <FormInput
              label="Email"
              placeholder="johndoe@email.com"
              type="email"
              onChange={handleForm}
              name="email"
            />
          </div>
          <div className="mb-8">
            <FormInput
              label="Password"
              placeholder="******************"
              type="password"
              onChange={handleForm}
              name="password"
            />
          </div>
          <div className="flex items-center justify-center ">
            <button
              className="bg-blue-500 flex-1 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignUp}
            >
              Sign In
            </button>
          </div>
        </form>
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
