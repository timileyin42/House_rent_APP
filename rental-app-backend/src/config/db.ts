import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
