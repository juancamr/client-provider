import request from "supertest";
import { BASE_URL } from "../../src/common/constants";

const routeRegister = "/api/public/user/register";
const routeLogin = "/api/public/user/login";
const routeUpdateProfile = "/api/user/profile";

let tokenUserNotExist: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzcwODMxNTMzYThmMjg1MWFlZWYxYSIsInR5cGUiOjEsImlhdCI6MTY5MDc2NTM2MX0.03sDqdfOm0GPxrXB7Fus64n6oo-NsQyEIfAWSvcBqkM";
let accessToken: string;

describe("user routes", () => {
  const username = "testuser";
  beforeAll(async () => {
    const response = await request(BASE_URL).post(routeRegister).send({
      name: "holamundo",
      last_name: "holamundo",
      username,
      email: "holamundo@adioeeaesxd.com",
      password: "mypasswordxd",
      confirm_password: "mypasswordxd",
    });
    accessToken = response.body.accessToken;
    console.log(response.body);
  });
  afterAll(async () => {
    await request(BASE_URL).delete(`/api/public/user/delete/${username}`);
  });
  it("should return 200 code when we logged in", async () => {
    const response = await request(BASE_URL).post(routeLogin).send({
      username: "holamundo",
      password: "holamundo",
    });
    expect(response.status).toBe(200);
  });
  it("should return 404 code when the token created contain a user that not exist", async () => {
    const response = await request(BASE_URL)
      .patch(routeUpdateProfile)
      .set("Authorization", `Bearer ${tokenUserNotExist}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(404);
  });
  it("should return all of the information of the user with code 200 because we pass the token created", async () => {
    const response = await request(BASE_URL)
      .patch(routeUpdateProfile)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
  });
});
