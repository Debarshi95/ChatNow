import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Loader = () => {
  return (
    <div className="content-container flex justify-center items-center h-screen">
      <ScaleLoader />
    </div>
  );
};

export default Loader;
