import { AUTH_ENDPOINTS } from "@/api/endpoints";
import { instance } from "@/api/ky-instance";

export const authService = {
  login: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.LOGIN, { json: payload });
    return res.json();
  },

  logout: async () => {
    const res = await instance.post(AUTH_ENDPOINTS.LOGOUT);
    return res.json();
  },

  me: async () => {
    const res = await instance.get(AUTH_ENDPOINTS.ME);
    return res.json();
  },

  refreshToken: async () => {
    const res = await instance.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
    return res.json();
  },

  forgotPassword: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { json: payload });
    return res.json();
  },

  resetPassword: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.RESET_PASSWORD, { json: payload });
    return res.json();
  },

  changePassword: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, { json: payload });
    return res.json();
  },
};