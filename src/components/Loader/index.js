import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Loader = () => {
  return (
    <div className="content-container flex justify-center items-center h-screen">
      <ScaleLoader color="blue" />
    </div>
  );
};

export default Loader;
