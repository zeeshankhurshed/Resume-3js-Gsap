import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2 className="font-extrabold text-4xl bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
        Loading...
      </h2>
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
