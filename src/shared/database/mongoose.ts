import mongoose from "mongoose";

export const connect = () => {
  const db: string = process.env.DB || "";
  mongoose.connect(db)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};