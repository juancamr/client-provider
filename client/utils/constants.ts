export const BASE_URL: string = "http://localhost:8000";

export const apis = {
  user: {
    REGISTER: "/api/public/user/register",
    LOGIN: "/api/public/user/login",
    IS_USERNAME_EXIST: "/api/public/user/is_username_exist",
    FORGOT_PASSWORD: "/api/public/user/forgot_password",
    UPDATE_PROFILE: "/api/user/profile",
  },
  freelancer: {
    UPDATE_PROFILE: "/api/freelancer/profile",
  },
  email_code: {
    GENERATE: "/api/verification_code/generate",
    VERIFY: "/api/verification_code/verify",
  },
};
