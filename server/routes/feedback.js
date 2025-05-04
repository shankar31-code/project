import express from 'express';
import authenticate from '../middleware/auth.js';
import Feedback from '../models/Feedback.js';
 const router =express.Router();
 router.post('/',authenticate,async(req,res)=>{
    try{
     const {message}=req.body;
     const username=req.user.username;
     const newFeedBack=new Feedback({message,username});
     await newFeedBack.save();
     res.status(201).json({message:'feedback received,thank you !'});
    }catch(error)
    {
        res.status(500).json({error:'Failed To Submit feedback'});
        
       

    }

    
 });
 router.get('/', async (req, res) => {
    try {
      const allFeedback = await Feedback.find().sort({ createdAt: -1 });
      res.json(allFeedback);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  });
 
  export default router;