import app from "../src/index.js";
import request from "supertest";

describe("GET /api", () => {
  it("...", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toBe(200);
    // expect(res.body.works).toBe(true);
  });
});

/*

describe("GET /api/test_endpoint", () => {
  it("should return works correctly", async () => {
    const res = await request(app).get("/api/test_endpoint");
    expect(res.statusCode).toBe(200);
    expect(res.body.works).toBe(true);
  });
});

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
