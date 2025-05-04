import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import Recipe from '../models/recipes.js';
const router=express.Router();
const upload=multer({storage});
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const fileUrl = req.file.path; // Cloudinary gives back the file URL
  
      const newRecipe = new Recipe({
        title,
        description,
        fileUrl,
        fileType: req.file.mimetype.startsWith('video') ? 'video' : 'image',
      });
  
      await newRecipe.save();
  
      res.status(201).json({ message: 'Recipe uploaded!', recipe: newRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: -1 }); // latest first
      res.json(recipes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  export default router;