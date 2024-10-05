import mongoose, { Schema, model } from "mongoose";

const accountSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  balance: Number,
});

export const Account = model("Account", accountSchema, "accounts");
