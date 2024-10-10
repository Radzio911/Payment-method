import { Router } from "express";
import { Session, Account, User } from "../models/index.js";


export const userRouter = new Router();


userRouter.get("/:balance", auth, async (req, res) => {
	const { Account } = req.params;
	const account = await getUserById(Account);
	if (account) {
		res.json(account);
	} else {
		res.status(404).json({ message: "Account not found" });
	}
});

userRouter.post("/deposit", async (req, res) => {
	const { Account } = req.params;
  
	const account = await User.findOne({
	  user: User,
	  balance: Number,
	})
});

userRouter.post("/withdraw", async (req, res) => {
	const { Account } = req.params;
  
	const account = await User.findOne({
	  user: User,
	  balance: Number,
	})
	if (Account) {
		res.json(account);
	} else {
		res.status(404).json({ message: "Not enough money." });
	}
});





