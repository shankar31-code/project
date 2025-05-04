import mongoose from 'mongoose';
const feedbackSchema=new mongoose.Schema({
    message:{type:String,required:true},
    username: { type: String, required:false},
    createdAt:{type:Date,default:Date.now}
});
export default mongoose.model('Feedback',feedbackSchema);