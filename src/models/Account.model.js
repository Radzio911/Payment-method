import mongoose, {Schema, model} from "mongoose";
import {Transaction} from "./Transaction.model.js";

const accountSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: "User"},
    balance: Number,
});

accountSchema.method.sendTo = async function (recipentId, amount) {
    this.balance -= amount;
    this.save();
    const recipentAccount = await Account.findById(recipentId);
    await Account.findByIdAndUpdate(recipentId, {
        balance: recipentAccount.balance + amount,
    });
    await Transaction.create({
        sender: this._id,
        recipient: recipentAccount._id,
        amount,
        datetime: new Date(),
    });
};

export const Account = model("Account", accountSchema, "accounts");
