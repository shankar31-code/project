import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/feedback.js';
import authRoutes from './routes/auth.js'
import recipeRoutes from './routes/recipes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log('MongoDB Conected'))
.catch(err=>{
    console.error("mongoDB connection error:",err);
})
app.use('/api/feedback', router);
app.use('/api/auth',authRoutes);
app.use('/api/recipes',recipeRoutes);
app.listen(process.env.PORT || 5000,()=>{
    console.log(`server running on port ${process.env.PORT}`);
    console.log("Mongo URI:", process.env.MONGODB_URI);
})

