import { AUTH_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';

export const profileService = {
  get: async () => {
    const res = await instance.get(AUTH_ENDPOINTS.ME);
    const data = await res.json();
    return data;
  },
};
