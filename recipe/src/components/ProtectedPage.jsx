import { useEffect,useState } from "react";
import axios from 'axios';
const ProtectedPage=()=>{
    const [message,setMessage]=useState('');
    const [error,setError]=useState('');
    useEffect(() => {
        const fetchProtectedData = async () => {
          try {
           
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/protected`, {
                 withCredentials: true,
            });
            setMessage(res.data.message);
              setLoading(false);
          } catch (err) {
            setError(err.response?.data?.message || 'Access denied');
          }
        };
    
        fetchProtectedData();
      }, []);
    
      return (
        <div className="p-4">
          {message && <p className="text-green-700">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      );
    };
    
    export default ProtectedPage;
