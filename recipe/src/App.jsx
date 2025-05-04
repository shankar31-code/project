import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import { BrowserRouter as Router,
  Routes,
  Route,
  Link
 } from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import Recipes from './components/Recipes'
import RecipeDetail from './components/RecipeDetail';
import FeedbackForm from './components/FeedbackForm';
import Register from './components/Register';
import LoginForm from './components/Loginform';
import ProtectedPage from './components/ProtectedPage';
import ProtectedCheck from './components/ProtectedCheck';
import UploadRecipe from './components/UploadRecipe';
function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));


  const [quote,setQuote]=useState(null);
  const [author,setAuthor]=useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [darkMode,setDarkMode]=useState(false);
  const toggleDarkMode=()=>{
    console.log("clicked");
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle("dark");
  }
  const [recipes,setRecipes]=useState([]);
  console.log(recipes);
 //foodQoutes  
 const foodQuoteApi="SDvElqKFTU4Y48NEQevFGA==kZFKVNoE81DBity4";
 const category="food";
 const fetchQuotes=async()=>{
   const response3=await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`,{
    headers:{
      "X-Api-Key":foodQuoteApi,
    },
  }
   );
   console.log("Quotes");
   console.log(response3.data[0].quote);
   console.log(response3.data[0].author);
   setQuote(response3.data[0].quote);
   setAuthor(response3.data[0].author);
   
 }
 

 const apiKey="bbf25c8dc4ae46b6a843d0a94161ae61";
  const fetchRecipes=async(query)=>{
   
    const response= await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${apiKey}`);
 
    if(response.data)
    {
     
      console.log(response)
      setRecipes(response.data)
      console.log(response.data);
    }
  }
  const fetchRandomRecipes=async()=>{
    const response2=await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=bbf25c8dc4ae46b6a843d0a94161ae61`)
    console.log(response2.data.recipes[0])
    setRandomRecipe(response2.data.recipes[0]);
  
  }
  useEffect(()=>{
fetchRandomRecipes();
fetchQuotes();
const intervalId=setInterval(()=>{
  fetchQuotes()
},100000)
return()=>clearInterval(intervalId);
  },[])
 
  return (
    
    <>
     <Router>
    <div className='w-screen h-screen'>
 

<Navbar isAuth={isAuth} setIsAuth={setIsAuth}></Navbar>
<Routes>
<Route path="/" element={<>

 <div className=' mx-10'>
 
      <Search onSearch={fetchRecipes}/>
    </div>
    <div className='mx-10 mt-5'>
    {quote && (
                    <div className="p-5 mb-5 border rounded shadow-md bg-gray-50 dark:bg-gray-800">
                      <p className="text-lg italic">{quote}</p>
                      <p className="text-sm text-right">— {author}</p>
                    </div>
                  )}
      <Recipes recipes={recipes}/>

      
    </div>
    </>}></Route>
    <Route path='/recipe/:id' element={<><RecipeDetail/></>}/>
   <Route path="/feedback" element={<FeedbackForm />} />
   <Route path="/register" element={<Register/>} />
   <Route path="/login" element={<LoginForm setAuth={setIsAuth} />} />
   <Route path="/protected" element={<ProtectedPage />} />
   <Route path="/protected-check" element={<ProtectedCheck />} />
   <Route path="/upload-recipe" element={<UploadRecipe />} />

    </Routes>
    
    </div>
    </Router>
   </>
 
  )
};

export default App
