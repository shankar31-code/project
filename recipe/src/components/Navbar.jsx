import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 

const Navbar = ({ isAuth, setIsAuth, username, setUsername }) => {
  const [menuOpen, setMenuOpen] = useState(false);


  const navigate = useNavigate();

  // Fetch username on mount or when isAuth changes
 

  // Logout logic
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      setIsAuth(false);
      setUsername('');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="bg-blue-500 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">RECIPE FINDER</h1>

        {/* Hamburger for mobile */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4 text-white">
          {username ? (
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col space-y-2 text-white md:hidden">
          {username ? (
            <>
              <Link to="/upload-recipe" className="hover:underline" onClick={() => setMenuOpen(false)}>Upload Recipe</Link>
              <Link to="/feedback" className="hover:underline" onClick={() => setMenuOpen(false)}>Feedback</Link>
              <span className="text-sm">Welcome, {username}!</span>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline" onClick={() => setMenuOpen(false)}>Register</Link>
              <Link to="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
