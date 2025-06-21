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
    try {
      const res = await instance(USERS_ENDPOINTS.GET_USERS);
      return await res.json();
    } catch (error) {
      console.log(error.message);
    }
  },

  createStaff: async (data, companyId) => {
    try {
      const res = await instance.post(USERS_ENDPOINTS.CREATE_STAFF + `?companyId=${companyId}`, {
        json: data,
      });
      return await res.json();
    } catch (error) {
      alert(error.message)
    }
  },

  createStudent: async (data, companyId) => {
    try {
      const res = await instance.post(USERS_ENDPOINTS.CREATE_STUDENT + `?companyId=${companyId}`, {
        json: data,
      });
      return await res.json();
    } catch (error) {
      alert(error.message)
    }
  },
};
