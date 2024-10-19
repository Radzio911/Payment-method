import { Router } from "express";
import { Transaction } from "../models";

export const transactionRouter = new Router();

transactionRouter.post("/send", auth, async (req, res) => {
  let { sender, amount, recipient } = req.body;
  amount = parseInt(amount);
  const senderAccount = await Account.findById(sender);
  if (senderAccount.user == req.user._id) {
    if (senderAccount.amount >= amount) {
      await senderAccount.sendTo(recipient, amount);
      res.json({ message: "Succesfull transaction" });
    } else {
      res.status(400).json({ message: "You dont have enough money" });
    }
  } else {
    res
      .status(403)
      .json({ massage: "You don't have permission to this endpoint" });
  }
});

requestSchema.post("/request", async (req, res) => {
  let { recipientId, amount } = req.body;
  amount = parseInt(amount);
  const recipient = await User.findById(recipientId);
  if (recipient) {
    const request = await Request.create({
      sender: req.user,
      amount,
      dateTime: new Date(),
      recipient,
      done: false,
    });
    res.json({ request });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

transactionRouter.get("/history", async (req, res) => {
  const transations = await Transaction.find({
    $or: [{ sender: req.getUserId() }, { recipient: req.getUserId() }],
  });
  res.json({ transations });
});

transactionRouter.get("/:id", async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId);
  res.json({ transaction });
});
