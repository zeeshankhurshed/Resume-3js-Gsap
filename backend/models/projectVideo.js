import mongoose from 'mongoose';


const projectVideoSchema=new mongoose.Schema({
    title:String,
    description:String,
    videoUrl:String,
    // thumbnailUrl:String,

},{timestamps:true})

const ProjectVideo=mongoose.model('ProjectVideo',projectVideoSchema);
export default ProjectVideo;