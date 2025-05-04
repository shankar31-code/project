import { useState } from "react";
import axios from "axios";
const Register=()=>{
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
const [status,setStatus]=
useState('');
 const handleRegister=async(e)=>{
    e.preventDefault();
    try{
        const res=await axios.post('/api/auth/register',{username,password});
        setStatus(res.data.message||'Register is successful')

    }
    catch(err)
    {
        setStatus(err.response?.data?.message||'Register failed')
    }
 };
 return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-3 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}

export default Register;