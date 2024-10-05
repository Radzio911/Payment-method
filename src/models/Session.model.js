import mongoose, { Schema, model } from "mongoose";

const sessionSchema = new Schema({
  key: String,
  data: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  expire: Date,
});

sessionSchema.methods.getData = function () {
  return JSON.parse(this.data);
};

sessionSchema.methods.setData = function (data) {
  this.data = JSON.stringify(data);
  this.save();
};

export const Session = model("Session", sessionSchema, "sessions");
