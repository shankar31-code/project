import { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeDescription from './RecipeDescription';

const UploadRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const fetchRecipes = async () => {
    const res = await axios.get('http://localhost:5000/api/recipes');
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      await axios.post('/api/recipes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Recipe uploaded!');
      setTitle('');
      setDescription('');
      setFile(null);
      fetchRecipes(); // refresh list
    } catch (error) {
      console.error(error);
      alert('Upload failed!');
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          className="block w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="block w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          className="block"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*,video/*"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
           {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {loading && <p className="mb-4 text-blue-600">Uploading your recipe...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border p-4 rounded shadow-md bg-white dark:bg-gray-800"
          >
            <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
            <RecipeDescription
        recipe={recipe}
        activePopoverId={activePopoverId}
        setActivePopoverId={setActivePopoverId}
      />
            {recipe.fileType === 'video' ? (
              <video
                src={recipe.fileUrl}
                controls
                className="w-full h-64 object-cover rounded"
              ></video>
            ) : (
              <img
                src={recipe.fileUrl}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadRecipe;

