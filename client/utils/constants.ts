export const BASE_URL = "http://192.168.1.150:3000";

export const apis = {
  user: {
    REGISTER: "/api/public/user/register",
    LOGIN: "/api/public/user/login",
    IS_USERNAME_EXIST: "/api/public/user/is_username_exist",
    FORGOT_PASSWORD: "/api/public/user/forgot_password"
  },
  email_code: {
    GENERATE: "/api/verification_code/generate",
    VERIFY: "/api/verification_code/verify",
  },
};
