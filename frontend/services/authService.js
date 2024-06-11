import api from "../utils/api";

export const login = async (email, password) => {
  console.log(api);
  const response = await api.post("/auth/login", { email, password });
  debugger;
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};
