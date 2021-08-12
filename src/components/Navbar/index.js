import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../store/slices/auth';
import Modal from '../Modal';

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
    <nav className="w-full border-b-2">
      <div className="flex py-2 px-4 justify-between md:w-3/4 mx-auto">
        <div className="flex justify-center items-center font-semibold text-blue-500 text-lg md:text-xl">
          <Link to="/">ChatNow</Link>
        </div>
        {isAuthenticated ? (
          <div className="flex">
            <button
              type="button"
              className="bg-blue-500 flex justify-center items-center text-white font-medium
            px-3 py-2 rounded-sm mr-4 text-sm"
              onClick={handleModal}
            >
              Add User
            </button>
            <button
              type="button"
              className="bg-blue-500 flex justify-center items-center text-white font-medium
              px-4 py-2 rounded-sm text-sm"
              onClick={handleLogout}
            >
              Signout
            </button>
          </div>
        ) : (
          <div className="bg-blue-500 flex justify-center items-center text-white font-medium px-5 py-2 rounded-sm">
            <Link to="/signup">SignUp</Link>
          </div>
        )}

        {isModalOpen && <Modal open={isModalOpen} onRequestClose={handleModal} />}
      </div>
    </nav>
  );
};
export default memo(Navbar);
