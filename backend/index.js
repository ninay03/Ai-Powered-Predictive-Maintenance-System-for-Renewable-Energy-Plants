import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB with mongoDB URI: ' + process.env.MONGODB_URI);
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
  }
};
connectDB();
app.use(router)

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the AI Predictive Maintenance System');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});