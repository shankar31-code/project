import { useState } from "react";

const Search=({onSearch})=>{
   const [query,setQuery]=useState("");
   const handleSearch=()=>{
    console.log("hello")
    onSearch(query);

    setQuery("");//clear the input field after a search is performed
   }
   console.log(query)
    return (
        <div className="container mx-auto mt-10">

          <input 
          onChange={(e)=>{
           setQuery(e.target.value) 
          }}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
          focus:ring-blue-500"
          placeholder="search your recipe OR by Ingredients" type='text'/>
          <button
          onClick={handleSearch} 
          className="
          mt-3 rounded-lg
          w-full px-6 py-3 bg-blue-400 text-white text-lg">Search</button>
        </div>
    )
}
export default Search;