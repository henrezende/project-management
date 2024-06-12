import { setCookie, destroyCookie } from "nookies";

export const setAuthToken = (token) => {
  setCookie(null, "token", token, { path: "/" });
};

export const clearAuthToken = () => {
  destroyCookie(null, "token", { path: "/" });
};
