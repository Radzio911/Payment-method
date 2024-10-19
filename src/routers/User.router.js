import { Router } from "express";
import { Session, User } from "../models/index.js";
import { v4 } from "uuid";
import { auth } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validate } from "../middlewares/validate.js";

export const userRouter = new Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail(),
    body("username").isAlphanumeric().isLength({ max: 20, min: 2 }),
    body("password").isAscii().isLength({ max: 20, min: 2 }),
    body("firstName").isAlpha(),
    body("lastName").isAlpha(),
    body("phoneNumber").isMobilePhone(),
    body("email")
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) throw new Error("");
      })
      .withMessage("User with this email already exists"),
    body("username")
      .custom(async (username) => {
        const user = await User.findOne({ username });
        if (user) throw new Error("");
      })
      .withMessage("User with this username already exists"),
  ],
  validate,
  async (req, res) => {
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

    res.status(201).json({ user });
  }
);

userRouter.post(
  "/login",
  body("username").isAlphanumeric(),
  body("password").isAscii(),
  validate,
  async (req, res) => {
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
  }
);

userRouter.post("/logout", auth, async (req, res) => {
  await Session.findByIdAndDelete(req.session._id);
  res.cookie("token", "");
  res.json({ message: "Logged out" });
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.json({
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

userRouter.put(
  "/:id",
  [
    body("email").isEmail(),
    body("username").isAlphanumeric().isLength({ max: 20, min: 2 }),
    body("password").isAscii().isLength({ max: 20, min: 2 }),
    body("firstName").isAlpha(),
    body("lastName").isAlpha(),
    body("phoneNumber").isMobilePhone(),
    body("email")
      .custom(async (email, { req }) => {
        const user = await User.findOne({ email });
        if (user && user._id != req.getUserId()) throw new Error("");
      })
      .withMessage("User with this email already exists"),
    body("username")
      .custom(async (username, { req }) => {
        const user = await User.findOne({ username });
        if (user && user._id != req.getUserId()) throw new Error("");
      })
      .withMessage("User with this username already exists"),
  ],
  validate,
  async (req, res) => {
    const { id } = req.params;

    if (id != req.user._id && !res.user.isAdmin) {
      res
        .status(403)
        .json({ message: "You don't have permission to this endpoint" });
      return;
    }

    const {
      username,
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      password,
      oldPassword,
    } = req.body;

    const user = await User.findById(id);
    if (user) {
      if (user.password == oldPassword) {
        await User.findByIdAndUpdate(id, {
          username,
          email,
          firstName,
          lastName,
          address,
          phoneNumber,
          password,
        });
        res.json({ message: "User updated successfully" });
      } else {
        res.status(403).json({ message: "Old password is wrong" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
);

userRouter.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (id != req.user.id && !res.user.isAdmin) {
    res
      .status(403)
      .json({ message: "You don't have permission to this endpoint" });
    return;
  }

  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully" });
});
