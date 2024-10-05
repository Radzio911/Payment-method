import { Router } from "express";
import { Session, User } from "../models/index.js";
import { v4 } from "uuid";

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

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
    password: password,
  });

  if (user) {
    const session = Session.create({
      data: "{}",
      expire: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      key: v4(),
      user: user,
    });
    const token = jwt.sign({ sessionId: session._id }, process.env.JWT);
    res.cookie("token", token);
    res.json({ message: "Login successfull!", token, user, session });
  } else {
    res.status(401).json({ message: "Bad username or password!" });
  }
});
