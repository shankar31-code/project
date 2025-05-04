const RecipeDescription = ({ recipe, activePopoverId, setActivePopoverId }) => {
    const isPopoverOpen = activePopoverId === recipe._id;
    const desc = recipe.description;
    const mid = Math.floor(desc.length / 2);
    const middleText = desc.slice(mid - 50, mid + 50);
  
    return (
      <div className="relative">
        <p className="mb-2 line-clamp-2">{desc}</p>
  
        {desc.length > 100 && (
          <button
            onClick={() =>
              setActivePopoverId(isPopoverOpen ? null : recipe._id)
            }
            className="text-blue-600 text-sm hover:underline"
          >
            {isPopoverOpen ? 'Close' : 'See more'}
          </button>
        )}
  
        {isPopoverOpen && (
           <div className="absolute z-10 top-20 left-1/2 -translate-x-1/2 w-72 max-h-48 overflow-y-auto p-4 bg-white dark:bg-gray-900 border rounded shadow-lg">
           <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
             {desc}
           </p>
           <button
             onClick={() => setActivePopoverId(null)}
             className="mt-2 text-blue-600 text-xs hover:underline"
           >
             Close
           </button>
         </div>
        )}
      </div>
    );
  };
  export default RecipeDescription;