import app from "./index.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO);

app.listen(5000);
