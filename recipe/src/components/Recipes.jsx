import  {useNavigate} from "react-router-dom";
const Recipes=({recipes})=>{
  
    const navigate=useNavigate();
    const handleViewRecipe=(item)=>{
      console.log("recipe details");
      navigate(`/recipe/${item.id}`,{ state:item});
    }
   
 
 return(
    <div className="grid 
    grid-cols-1
    lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-5">
    
        {recipes.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg grid items-center justify-center text-center p-4"
            >
              <div className="w-72 h-52">
                <img
                  className="w-full h-full object-cover"
                  src={item.image || "https://via.placeholder.com/300"}
                  alt={item.name || "Recipe image"}
                />
              </div>
              <div className=" gap-10 mt-5 font-bold">
                <p>{item.title }</p>
                <button onClick={()=>handleViewRecipe(item)} className="text-blue-500 hover:underline mt-5">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
    
    
    </div>
   
    
    
    
 )
}
export default Recipes;