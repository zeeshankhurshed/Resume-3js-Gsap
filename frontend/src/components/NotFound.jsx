import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  px-4 text-center">
      {/* SVG Illustration */}
      <svg
        className="w-64 h-64 mb-6"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="#3B82F6" strokeWidth="10">
          <path d="M300 300 h-50 v-100 h-100 v200 h50 v-50 h100z" />
          <circle cx="400" cy="300" r="30" />
          <path d="M550 300 h-50 v-100 h-100 v200 h50 v-50 h100z" />
        </g>
        <text
          x="50%"
          y="80%"
          textAnchor="middle"
          fill="#64748b"
          fontSize="40"
          fontFamily="Arial, sans-serif"
        >
          Page Not Found
        </text>
      </svg>

      {/* Message */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition-colors duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;

