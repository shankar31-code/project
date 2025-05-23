import express from "express";
import User from '../models/user.js'
import bcrypt from 'bcryptjs'; // <-- changed from 'bcrypt' to 'bcryptjs'
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
    try{
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
           expiresIn:'1h' 
        }
    );
     res.cookie('token',token, {
      httpOnly: true,
      secure:true,
      sameSite: 'None', // or 'none' if using HTTPS and cross-site
      maxAge: 3600000, // 1 hour
    });
  
res.status(200).json({
  message: 'Login successful',
  username: user.username
});

    }
    catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,       // Only if using HTTPS
    sameSite: 'None'     // Or 'None' if cross-site and HTTPS
  });
  res.json({ message: 'Logged out successfully' });
});

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ username: user.username }); // ✅ send the username
});
export default router;
