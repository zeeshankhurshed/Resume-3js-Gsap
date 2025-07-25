import { v2 as cloudinary } from 'cloudinary';
import ProjectVideo from '../models/projectVideo.js';

cloudinary.config({
    cloud_name: 'dncayjzf6',
    api_key: '227586118867997',
    api_secret: 'gqXaIE4MHT_j6lLyxhorlLCihzI'
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