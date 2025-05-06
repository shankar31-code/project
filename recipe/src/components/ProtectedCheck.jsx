import React from 'react';
import axios from 'axios';

const ProtectedCheck = () => {
  const handleClick = async () => {
    try {
      
 
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/protected`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
    } catch (err) {
      alert('Access denied');
    }
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Access Protected Route
      </button>
    </div>
  );
};

export default ProtectedCheck;
