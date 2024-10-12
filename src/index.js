import express from "express";
import { auth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import { admin } from "./middlewares/admin.js";
import { logging } from "./middlewares/logging.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routers/User.router.js";
import { accountRouter } from "./routers/Account.router.js";

dotenv.config();

mongoose.connect(process.env.MONGO);

const app = express();

app.use(express.json());

app.use(logging);

app.use(cookieParser());

app.use(auth);

app.use(admin);

app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);

app.listen(5000);

export default app;
