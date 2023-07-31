import { BASE_URL } from "../../src/common/constants";
import request from "supertest";

const routeRegister = "/api/public/freelancer/register";
const routeLogin = "/api/public/freelancer/login";
const routeUpdateProfile = "/api/freelancer/profile";

let accessToken: string;

describe("freelancer routes", () => {
  const username = "testfreelancer";
  beforeAll(async () => {
    const response = await request(BASE_URL).post(routeRegister).send({
      name: "holamundo",
      last_name: "holamundo",
      username,
      email: "holamundo@holamundo.com",
      password: "holamundo",
      confirm_password: "holamundo",
    });
    accessToken = response.body.accessToken;
  });
  afterAll(async () => {
    await request(BASE_URL).delete(`/api/public/freelancer/delete/${username}`);
  });
  it("should return 200 code when we logged in", async () => {
    const response = await request(BASE_URL).post(routeLogin).send({
      username: "holamundo",
      password: "holamundo",
    });
    expect(response.status).toBe(200);
  });
  it("should return all of the information of the user with code 200 because we pass the token created", async () => {
    const response = await request(BASE_URL)
      .patch(routeUpdateProfile)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
  });
});
