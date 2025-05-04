import axios from "axios";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import RecipeInstruction from "./RecipeInstruction";
const RecipeDetail=()=>{
   const[details,setDetails]=useState("");
   
    const location =useLocation();
    const recipe=location.state;
  
  useEffect(()=>{
   const fetchDetails=async()=>{
    if(!recipe) return;
    const response=await axios.get(` https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=bbf25c8dc4ae46b6a843d0a94161ae61`)
  
    setDetails(response.data);
  }   
  fetchDetails();
},[recipe]);

   console.log(details);
  
  
    if(!recipe){
        return<p>REcipe not found</p>
    }
    return (
        <div className="p-5">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <div className="flex justify-center align-center w-full">
          <img
            className=" w-500 h-auto object-cover mt-5"
            src={recipe.image || "https://via.placeholder.com/300"}
            alt={recipe.title}
          /> </div>
              <p className="mt-10 text-2xl mb-5 text-extrabold">About Recipe</p>
              <div className="mt-5 mx-5" dangerouslySetInnerHTML={{ __html: details.summary }} />
             <div>
             <RecipeInstruction analyzedInstruction={details.analyzedInstructions} />
             </div>
          {/* Add more details as required */}
        
        </div>
      );
};
export default RecipeDetail;