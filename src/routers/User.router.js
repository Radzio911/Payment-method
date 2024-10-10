import { Router } from "express";
import { Session, User } from "../models/index.js";
import { v4 } from "uuid";
import { auth } from "../middlewares/auth.js"

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

userRouter.post("/login", auth, async (req, res) => {
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

userRouter.get("/:User", async (req, res) => {
	const { User } = req.params;
	const user = await getUserById(User);
	if (user) {
		res.json(user);
	} else {
		res.status(404).json({ message: "User not found" });
	}
});

userRouter.put("/:User", auth, async (req, res) => {
	const { User } = req.params;
	const { username, email, firstName, lastName, address, phoneNumber } = req.body;
	if (username && email && firstName && lastName && address && phoneNumber) {
		const user = await getUserById(User);
		if (user) {
			await updateUser(User, {
				username,
				email,
				firstName,
				lastName,
				address,
        phoneNumber,
			});
			res.json({ message: "User updated successfully" });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} else {
		res.status(400).json({ message: "Bad request" });
	}
});

userRouter.delete("/:User", auth, async (req, res) => {
	const { User } = req.params;
	const user = await getUserById(User);
	if (user) {
		await deleteUser(User);
		res.json({ message: "User deleted successfully" });
	} else {
		res.status(404).json({ message: "User not found" });
	}
});
