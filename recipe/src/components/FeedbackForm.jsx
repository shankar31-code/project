import {useState,useEffect} from 'react';
import axios from 'axios';
const FeedbackForm=()=>{

    const[message,setMessage]=useState('');
    const [status,setStatus]=useState(null);
    const [feedbackList,setFeedbackList]=useState([]);
    // for fetching all feedbacks from database
    useEffect(()=>{
        fetchFeedback();
    },[]);
    const fetchFeedback=async()=>{
        try{
       const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`, {
  params: { message },
  withCredentials: true,
});

        if(Array.isArray(res.data)){
        setFeedbackList(res.data);
        }else
        {
            console.error("Expected an array but got:", res.data);
            setFeedbackList([]);   
        }
        }
        catch(err){
   console.error("error fetching  feedback:",err);
    }
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();

    try{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback`, { message }, {
    withCredentials: true, // ✅ sends cookie to backend
  });

        setStatus('Feedback Submitted');
        setMessage('');
        fetchFeedback();
    }
    catch(err)
    {
        setStatus("failed to submit feedback");
    }
  };
  return(
    <div className="p-4 border rounded bg-white dark:bg-gray-800 mt-5 max-w-md mx-auto">
    <h2 className="text-xl mb-2 font-bold">Give Us Feedback</h2>
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="4"
        placeholder="Your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Submit
      </button>
      {status && <p className="mt-2">{status}</p>}
    </form>

    {/* Display Feedback List */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">User's Feedback</h3>
      {feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul className="space-y-2">
          {feedbackList.map((fb) => (
            <li
              key={fb._id}
              className="p-2 border rounded bg-gray-100 dark:bg-gray-700"
            >
<p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {fb.username || 'Anonymous'}:
                </p>
                <p className="text-gray-800 dark:text-white">{fb.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

  );
}
export default FeedbackForm;
