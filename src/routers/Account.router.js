import { Router } from "express";
import { Account } from "../models/index.js";
import PaymentManager from "../PaymentManager.js";
import { auth } from "../middlewares/auth.js";

export const accountRouter = new Router();

accountRouter.post("/create", auth, async (req, res) => {
  const account = await Account.create({ balance: 0, user: req.getUserId() });
  res.json({ account });
});

accountRouter.get("/balance", auth, async (req, res) => {
  const accounts = await Account.find({ user: req.user._id });
  const balanceSum = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );
  res.json({ balanceSum, numberOfAccounts: accounts.length, accounts });
});

accountRouter.post("/deposit", async (req, res) => {
  const { accountId, transferId } = req.query;

  const transfer = await PaymentManager.checkPaymentStatus(transferId);

  if (transfer.done) {
    const account = await Account.findById(accountId);
    await Account.findByIdAndUpdate(accountId, {
      balance: account.balance + transfer.amount,
    });
    res.json({ message: "Everyting done" });
  } else {
    res.status(400).json({ message: "Transfer is not done yet" });
  }
});

accountRouter.post("/withdraw", auth, async (req, res) => {
  let { accountId, amount, iban } = req.query;

  amount = parseInt(amount);

  const account = await Account.findById(accountId);

  if (account.user != req.getUserId() && !req.admin) {
    res.status(403).json({ message: "You do not have permission" });
  }

  if (account.balance >= amount) {
    const transfer = await PaymentManager.withdraw(amount, iban);
    if (transfer) {
      res.json({ message: "Withdraw successfull" });
    } else {
      res.status(400).json({ message: "Withdraw error" });
    }
  } else {
    res.status(400).json({ message: "Withdraw error" });
  }
});
