import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Navbar=({isAuth,setIsAuth})=>{
  const [username, setUsername] = useState('');
  const navigate=useNavigate();
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [isAuth]);
  const handleLogout = () => {
    // Remove token and username from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    // Redirect to login page after logout
    navigate('/login');
    
    window.location.reload();
  };

  return(
    <div className={`flex
    item-center justify-between  bg-blue-500 p-5`}>
    <h1 className="text-xl font-bold">RECIPE FINDER</h1>
    
    <div className="flex items-center space-x-4">
           

        {username ? (
          <>
          <Link to="/upload-recipe" className="mx-2 hover:underline">
  Upload Recipe
</Link>

                  <Link to="/feedback" className="hover:underline">
          Feedback
        </Link>
            <span className="text-sm">Welcome, {username}!</span>
            <button onClick={handleLogout} className="mx-2 hover:underline">
              Logout
            </button>
          </>
        ) :(<> 
        <Link to="/register" className="mx-2">Register</Link>
<Link to="/login" className="mx-2">Login</Link>
</>)}

    </div>
    </div>
)

}
export default Navbar;