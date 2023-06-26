
export interface User {
  name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}
export interface UserLogin extends Pick<User, "username" | "password"> {}