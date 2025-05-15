export const AUTH_ENDPOINTS = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  ME: 'auth/me',
  REFRESH_TOKEN: 'auth/refresh-token',
  FORGOT_PASSWORD: 'auth/forgot-password',
  RESET_PASSWORD: 'auth/reset-password',
  CHANGE_PASSWORD: 'auth/change-password',
};

export const COMPANY_ENDPOINTS = {
  CREATE_COMPANY: 'companies',
  GET_COMPANIES: 'companies',
  GET_COMPANY: 'companies/:id',
  UPDATE_COMPANY: 'companies/:id',
  DELETE_COMPANY: 'companies/:id',
};

export const GROUP_ENDPOINTS = {
  CREATE_GROUP: 'groups',
  GET_GROUPS: 'groups',
  GET_GROUP: 'groups/:id',
  UPDATE_GROUP: 'groups/:id',
  DELETE_GROUP: 'groups/:id',
  GET_GROUPS_WITH_COMPANY_ID: 'groups?companyId=:companyId',
};

export const USERS_ENDPOINTS = {
  GET_USERS: 'users',
};

export const PROBLEMS_ENDPOINTS = {
  GET_PROBLEMS: 'tasks',
  GET_PROBLEM: 'tasks/:id',
  GET_LESSONS_PROBLEMS: 'tasks/:id/lessons',
  CREATE_LESSON_PROBLEM: 'tasks/:id/lessons',
  CREATE_PROBLEM: 'tasks',
  UPDATE_PROBLEM: 'tasks/:id',
  DELETE_PROBLEM: 'tasks/:id',
};
