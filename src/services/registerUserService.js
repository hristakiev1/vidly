import http from "./httpService";
import config from "../config.json";

const usersApi = config.apiEndpoint + "/users/";

export function registerUser(user) {
  return http.post(usersApi, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
