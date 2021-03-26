import { axios } from "../core/axios";

export const AuthApi = {
  login: async (loginData) => {
    const { data } = await axios.post("/auth/login", loginData);
    return data.data;
  },
  register: async (registerData) => {
    const { data } = await axios.post("/auth/register", registerData);
    return data.data;
  },
  getMe: async () => {
    const { data } = await axios.get("/users/me");
    return data.data;
  }
};
