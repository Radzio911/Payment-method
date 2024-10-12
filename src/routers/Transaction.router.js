import { Router } from "express";

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
