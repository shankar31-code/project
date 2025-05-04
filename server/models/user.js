import mongoose from "mongoose";
import bcrypt from 'bcryptjs'; // ✅ Changed from 'bcrypt' to 'bcryptjs'

const userSchema =new mongoose.Schema({
    username:{ type:String,required:true,unique:true},
    password:{type:String,required:true},
});
// this runs before saving to hash the password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) {return 
    next();}
    this.password=await bcrypt.hash(this.password,10);
    next();
});
 const User =mongoose.model('User',userSchema);
 export default User;
