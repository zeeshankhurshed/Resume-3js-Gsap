import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import cookiePrser from 'cookie-parser';
import userRoute from './routes/user.js';
import videoRoute from './routes/projectVideo.js';

dotenv.config();
connectDB();


const app=express();
const PORT =process.env.PORT || 3334;

app.use(cors());
app.use(express.json({limit:'30mb'}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cookiePrser());


app.use('/user', userRoute);
app.use('/video',videoRoute);


app.listen(PORT,()=>{
    console.log(`Server is litening on port ${PORT}`);
    
})