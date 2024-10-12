import mongoose, { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "Account" },
  recipient: { type: mongoose.Types.ObjectId, ref: "Account" },
  amount: Number,
  datetime: Date,
});

export const Transaction = model(
  "Transaction",
  transactionSchema,
  "transactions"
);
