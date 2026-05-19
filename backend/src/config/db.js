import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export default async function connectDatabase() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is required in environment variables');
  }

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB Atlas');
}
