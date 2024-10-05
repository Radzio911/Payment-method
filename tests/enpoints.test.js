import app from "../src/index.js";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../src/models/User.model.js";

dotenv.config();

mongoose.connect(process.env.TEST_MONGO);

describe("POST /api/user/register", () => {
  it("create user", async () => {
    const res = await request(app).post("/api/user/register").send({
      username: "admin",
      password: "admin",
      email: "admin@admin.com",
      firstName: "Admin",
      lastName: "Admin",
      address: "...",
      phoneNumber: "0000000000",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user.username).toBe("admin");
    const user = await User.findById(res.body.user._id);
    expect(user !== null).toBe(true);
    await User.findByIdAndDelete(res.body.user._id);
  });
});

/*

describe("POST /api/test_endpoint", () => {
  it("should return works correctly", async () => {
    const res = await request(app)
      .post("/api/test_endpoint")
      .send({ data: 123 });
    expect(res.statusCode).toBe(200);
    expect(res.body.works).toBe(true);
    expect(res.body.body.data).toBe(123);
  });
});

*/
