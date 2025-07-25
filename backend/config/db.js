import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI); 
    console.log('DataBase connected at port:', connection.connection.port);
  } catch (error) {
    console.error('DataBase connection error:', error.message);
    process.exit(1);
  }
};
