export const AUTH_ENDPOINTS = {
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  ME: "auth/me",
  REFRESH_TOKEN: "auth/refresh-token",
  FORGOT_PASSWORD: "auth/forgot-password",
  RESET_PASSWORD: "auth/reset-password",
  CHANGE_PASSWORD: "auth/change-password",
};

export const COMPANY_ENDPOINTS = {
  CREATE_COMPANY: "companies",
  GET_COMPANIES: "companies",
  GET_COMPANY: "companies/:id",
  UPDATE_COMPANY: "companies/:id",
  DELETE_COMPANY: "companies/:id",
};

export const GROUP_ENDPOINTS = {
  CREATE_GROUP: "groups",
  GET_GROUPS: "groups",
  GET_GROUP: "groups/:id",
  UPDATE_GROUP: "groups/:id",
  DELETE_GROUP: "groups/:id",
};
