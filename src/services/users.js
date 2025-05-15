import { USERS_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';

export const usersService = {
  get: async () => {
    const res = await instance(USERS_ENDPOINTS.GET_USERS);
    return await res.json();
  },
};
