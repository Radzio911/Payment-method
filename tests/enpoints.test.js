import app from "../src/index.js";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

const endpoints = {
  user: {
    register: "/api/user/register",
    login: "/api/user/login",
    logout: "/api/user/logout",
  },
  account: {
    create: "/api/account/register",
    balance: "/api/account/balance",
    deposit: "/api/account/deposit",
    withdraw: "/api/account/withdraw",
  },
  transaction: {
    send: "/api/transaction/send",
  },
};

dotenv.config();

let server = null;

beforeAll(() => {
  server = app.listen(5001);
  mongoose.connect(process.env.MONGO_TEST);
});

afterAll((done) => {
  if (server) {
    server.close(done);
  } else {
    done();
  }

  mongoose.connection.dropDatabase();
});

describe("POST /api/user/register", () => {
  it("create user", async () => {
    const response = await request(app).post(endpoints.user.register).send({
      username: "admin",
      password: "admin",
      email: "admin@admin.com",
      firstName: "admin",
      lastName: "admin",
      address: "",
      phoneNumber: "",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
  });
});
