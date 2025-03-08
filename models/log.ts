import mongoose from "mongoose";

export interface ILog extends mongoose.Document {
  userID: string;
  date: number;
  mbti: string;
  gender: string;
  age: string;
  relationship: string;
  chat: string[];
}

const logSchema = new mongoose.Schema({
  userID: {
    String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mbti: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  chat: {
    type: [String],
    required: true,
  },
});

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

export default Log;