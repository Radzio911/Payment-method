import app from "../../src/index.js";
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

describe("User", () => {
  it("Correct Register", async () => {
    const response = await request(app).post(endpoints.user.register).send({
      username: "admin",
      password: "admin",
      email: "admin@admin.com",
      firstName: "admin",
      lastName: "admin",
      address: "",
      phoneNumber: "48100100100",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  it("Register (used username)", async () => {
    const response = await request(app).post(endpoints.user.register).send({
      username: "admin",
    });
    expect(response.statusCode).toBe(400);
  });

  it("Register (wrong email)", async () => {
    const response = await request(app).post(endpoints.user.register).send({
      username: "admin-123",
      email: "wrongemail",
    });
    expect(response.statusCode).toBe(400);
  });

  it("Login", async () => {
    const response = await request(app).post(endpoints.user.login).send({
      username: "admin",
      password: "admin",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");

    const token = response.body.token;
  });
});
