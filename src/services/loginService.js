import http from "./httpService";
import config from "../config.json";

const loginService = config.apiEndpoint + "/auth/";

export function login(user, password) {
  return http.post(loginService, {
    email: user,
    password,
  });
}
