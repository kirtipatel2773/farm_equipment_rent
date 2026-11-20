import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agrirent_db';

let isConnected = false;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return mongoose.connection;
    }

    const conn = await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to ${conn.connection.name} at ${conn.connection.host}`);
    return conn;
  } catch (err) {
    isConnected = false;
    console.error(`[MongoDB Error] Failed to connect to MongoDB: ${err.message}`);
    throw err;
  }
};

export const getDbStatus = () => isConnected || mongoose.connection.readyState === 1;

export default connectDB;
