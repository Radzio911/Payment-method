import mongoose, { Schema, model } from "mongoose";

const withdrawSchema = new Schema({
  datetime: Date,
  account: { type: mongoose.Types.ObjectId, ref: "Account" },
  amount: Number,
});

export const Withdraw = model("Withdraw", withdrawSchema, "withdraws");
