import { USERS_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';

export const usersService = {
  create: async (data, role) => {
    const endpoint =
      role === 'student'
        ? USERS_ENDPOINTS.CREATE_STUDENT
        : USERS_ENDPOINTS.CREATE_STAFF;

    const res = await instance.post(endpoint, {
      json: data,
    });
    return await res.json();
  },
  get: async () => {
    const res = await instance(USERS_ENDPOINTS.GET_USERS);
    return await res.json();
  },

  createStaff: async (data) => {
    const res = await instance.post(USERS_ENDPOINTS.CREATE_STAFF, {
      json: data,
    });
    return await res.json();
  },

  createStudent: async (data) => {
    const res = await instance.post(USERS_ENDPOINTS.CREATE_STUDENT, {
      json: data,
    });
    return await res.json();
  },
};
