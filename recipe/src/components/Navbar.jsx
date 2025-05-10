import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Navbar = ({ isAuth, setIsAuth }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Fetch username on mount or when isAuth changes
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/protected`, {
          withCredentials: true,
        });
        setUsername(res.data.username); // Make sure your backend returns { username }
        setIsAuth(true);
      } catch (err) {
        console.log('User not authenticated:', err);
        setIsAuth(false);
        setUsername('');
      }
    };

    fetchUsername();
  }, [setIsAuth]);

  // Logout logic
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      setIsAuth(false);
      setUsername('');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-between bg-blue-500 p-5">
      <h1 className="text-xl font-bold text-white">RECIPE FINDER</h1>

      <div className="flex items-center space-x-4 text-white">
        {isAuth && username ? (
          <>
            <Link to="/upload-recipe" className="hover:underline">Upload Recipe</Link>
            <Link to="/feedback" className="hover:underline">Feedback</Link>
            <span className="text-sm">Welcome, {username}!</span>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
