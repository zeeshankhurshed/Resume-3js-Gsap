import mongoose from 'mongoose'

const useSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:['admin','user'], default:'user'},
    descriptor:{type:[Number],default:[]},
    
},{timestamps:true})


const User=mongoose.model('User',useSchema);

export default User;