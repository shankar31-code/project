import mongoose from 'mongoose';


const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['image', 'video'], required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
