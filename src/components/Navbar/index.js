import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/auth';
import Modal from '../Modal';
import { makeClasses } from '../../utils';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className={makeClasses('w-full', 'border-b-2')}>
      <div className={makeClasses('flex', 'py-2 px-4', 'justify-between', 'md:w-3/4 mx-auto')}>
        <div
          className={makeClasses(
            'flex',
            'justify-center',
            'items-center',
            'font-semibold',
            'text-sm text-gray-600 sm:text-base'
          )}
        >
          <Link to="/">ChatNow</Link>
        </div>
        {isAuthenticated ? (
          <div className={makeClasses('flex')}>
            <button
              type="button"
              className={makeClasses(
                'flex',
                'justify-center',
                'items-center',
                'text-gray-600 font-medium',
                'px-3 py-2 rounded-sm mr-4 text-sm',
                'rounded-xl'
              )}
              onClick={handleModal}
            >
              Add User
            </button>
            <button
              type="button"
              className={makeClasses(
                'flex',
                'bg-white flex justify-center',
                'items-center text-gray-600',
                'font-medium px-4 py-2 rounded-sm text-sm'
              )}
              onClick={handleLogout}
            >
              Signout
            </button>
          </div>
        ) : (
          <div
            className={makeClasses(
              'flex',
              'justify-center items-center',
              'text-sm text-gray-600 sm:text-base',
              'px-5 py-2',
              'border-2 rounded-3xl border-slate-400'
            )}
          >
            <Link to="/signup">SignUp</Link>
          </div>
        )}

        {isModalOpen && <Modal open={isModalOpen} onRequestClose={handleModal} />}
      </div>
    </nav>
  );
};
export default memo(Navbar);
