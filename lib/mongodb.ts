import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch () {
    //2.2.12 version 시도 (스타벅스 공유기 오류 방지)
    try {
      const uri2 = process.env.MONGODB_URI2;
      if (!uri2) {
        throw new Error("MONGODB_URI is no defined");
      }
      await mongoose.connect(uri2);
      console.log("Connected to `MongoDB");
    } catch (error) {
      console.log("Error!", error);
    }
  }
};
