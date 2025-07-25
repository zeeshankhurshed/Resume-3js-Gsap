import { v2 as cloudinary } from 'cloudinary';
import ProjectVideo from '../models/projectVideo.js';

import dotenv from 'dotenv';

dotenv.config(); // Load env variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createVideos = async (req, res) => {
    try {
        const { title, description, videoUrl, thumbnailUrl } = req.body;
        
        const newVideo = await ProjectVideo.create({
            title,
            description,
            videoUrl,
            // thumbnailUrl
        });
        
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideos=async(req,res)=>{
    try {
        const videos=await ProjectVideo.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}