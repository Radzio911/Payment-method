import mongoose, { Schema, model } from "mongoose";

const requestSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  amount: Number,
  dateTime: Date,
  recipient: { type: mongoose.Types.ObjectId, ref: "User" },
  done: Boolean,
});

export const Request = model("Request", requestSchema, "requests");
