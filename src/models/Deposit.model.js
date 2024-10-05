import mongoose, { Schema, model } from "mongoose";

const depositSchema = new Schema({
  datetime: Date,
  account: { type: mongoose.Types.ObjectId, ref: "Account" },
  amount: Number,
});

export const Deposit = model("Deposit", depositSchema, "deposit");
