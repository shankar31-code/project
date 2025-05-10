import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginForm = ({setAuth}) => {
    const navigate=useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password },{ withCredentials: true});
      if(res.data.message=='Login successful'){
      
      setAuth(true);
       setUsername(res.data.username);
      

navigate('/'); // smoother SPA-style redirect

          console.log(res.data.username);

      
      

      console.log("successfull");
   
          
      }
        else {
        // Handle case where no token is returned
        console.error('No token received');
        setError('Login failed: No token received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded w-full max-w-sm mx-auto shadow-md bg-white dark:bg-gray-800 mt-10">
    <h2 className="font-bold text-2xl mb-4 text-center">Login</h2>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="mb-4 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mb-4 p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      required
    />
   
    <button
      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors"
      type="submit"
    >
      Login
    </button>
    {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}
    <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
  Don’t have an account?{' '}
  <a href="/register" className="text-green-600 hover:underline font-medium">
    Register here
  </a>
</p>
  </form>
  
  );
};

export default LoginForm;
