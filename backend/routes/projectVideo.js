import express from 'express';
import { createVideos, getVideos } from '../controller/projectVideo.js';

const router = express.Router();

// Changed from multer upload to standard JSON handling
router.post('/', createVideos);
router.get('/', getVideos);

export default router;