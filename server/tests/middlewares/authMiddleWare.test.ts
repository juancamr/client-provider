import request from "supertest";
import { BASE_URL } from "../../src/common/constants";

describe("auth middleware", () => {
  it("should return 401 unauthorized when I try to make a request to protected route", async () => {
    const response = await request(BASE_URL).patch("/api/user/profile");
    expect(response.status).toBe(401);
  });
});
