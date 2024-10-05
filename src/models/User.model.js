import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  address: String,
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  phoneNumber: String,
});

export const User = model("User", userSchema, "users");
