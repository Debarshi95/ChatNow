import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full border-b-2 border-blue-500">
      <div className="flex py-3 px-4 justify-between">
        <div className="flex justify-center items-center font-medium text-blue-500">
          <Link to="/">ChatNow</Link>
        </div>
        <div className="rounded-full w-7 h-7 bg-blue-500 flex justify-center items-center text-white font-medium">
          <Link to="/signin">S</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
