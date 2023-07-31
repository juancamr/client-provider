import request from "supertest";
import { BASE_URL } from "../../src/common/constants";

const routeExample = "/api/public/user/login";

describe("validate params middleware", () => {
  it("should return 400 for invalid params", async () => {
    const response = await request(BASE_URL).post(routeExample).send({
      holamundo: "holamundo",
    });
    expect(response.status).toBe(400);
  });
  it("should pass when the request is complete", async () => {
    const response = await request(BASE_URL).post(routeExample).send({
      username: "holamundo",
      password: "holamundo",
    });
    expect(response.status != 400).toBe(true);
  });
  it("should return 400 when the type of a param is incorrect", async () => {
    const response = await request(BASE_URL).post(routeExample).send({
      username: 10,
      password: true,
    });
    expect(response.status).toBe(400);
  });
});
