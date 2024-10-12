import app from "../src/index.js";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../src/models/User.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO);

describe("POST /api/user/register", () => {
  it("create user", async () => {
    await User.findOneAndDelete({ username: "admin" });
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

describe("POST /api/user/login", () => {
  it("login user", async () => {
    await User.findOneAndDelete({ username: "admin" });
    const testUser = await User.create({
      username: "admin",
      password: "admin",
    });
    const res = await request(app)
      .post("/api/user/login")
      .send({ username: "admin", password: "admin" });

    expect(res.statusCode).toBe(200);
    const token = res.body.token;
    expect(token != null).toBe(true);

    const balanceRes = await request(app)
      .get("/api/account/balance")
      .send({ token });

    expect(balanceRes.statusCode).toBe(200);
    expect(balanceRes.body.balanceSum).toBe(0);
    expect(balanceRes.body.numberOfAccounts).toBe(0);

    await User.findOneAndDelete({ username: "admin" });
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
