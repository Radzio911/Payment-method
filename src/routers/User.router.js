import { Router } from "express";
import { User } from "../models/user.js";

export const userRouter = new Router();

userRouter.post("/register", async (req, res) => {
  const {
    username,
    password,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
  } = req.body;

  const user = await User.create({
    username,
    password,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
  });

  res.json({ user });
});
