import express from "express";
import User from '../models/user.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authMiddleware } from "../middleware/auth.js";
dotenv.config();
const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET;
// register new user
router.post('/register',async(req,res)=>{
    const{username,password}=req.body;
    const userExits =await User.findOne(
    {username});
    if(userExits)
    {
        return res.status(400).json({message:'User Already exits'});
    }
    const newUser =new User({username,password});
    await newUser.save();
    res.status(201).json({message:'User registered'});
})
//login endpoint
router.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const user =await User.findOne({username});
    if(!user)
    {
     return res.status(400).json({message:'Invalid credentials'});

    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(400).json({
            message:'Invalid credentails'
        });
    }
    const token=jwt.sign({userId:user._id,username:user.username},
        JWT_SECRET,{
           expiresIn:'1d' 
        }
    );
    res.json({token});
});
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Welcome user ${req.user.userId}` });
  });
export default router;