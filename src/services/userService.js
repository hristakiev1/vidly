import jwt_decode from "jwt-decode";
import http from "./httpService";

const tokenKey = "token";

http.setJwt(getJwt());

export async function setUserToken(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getUser() {
  try {
    const user = jwt_decode(localStorage.getItem(tokenKey));
    return user;
  } catch (error) {}
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  logout,
  setUserToken,
  getUser,
  getJwt,
};
