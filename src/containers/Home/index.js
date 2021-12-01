import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FormInput from '../../components/FormInput';
import { signIn } from '../../store/slices/auth';
import routes from '../../utils/routes';

const Home = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    if (email === '' || password === '') return;

    const res = await dispatch(signIn({ email, password })).unwrap();
    if (res?.user) {
      history.push(routes.chat.route);
    }
  };
  return (
    <div className="content-container w-full md:w-3/5 mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-sm">
        <form className="px-4 md:px-8 pt-6 pb-8 mb-4" autoComplete="off">
          <h4 className="text-center font-medium text-blue-500 text-lg mt-6 mb-8">
            Sign in to your ChatNow account to continue
          </h4>
          <div className="mb-4">
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
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 flex-1 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </form>
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
