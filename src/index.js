import express from "express";
import { auth } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import { admin } from "./middlewares/admin.js";
import { logging } from "./middlewares/logging.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO);

const app = express();

app.use(logging);

app.use(cookieParser());

app.use(auth);

app.use(admin);

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({});
});

app.listen(5000);

export default app;

/*

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Radzio911/Payment-method.git
git push -u origin main

*/
