import { COMPANY_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';

export const companyService = {
  create: async (payload) => {
    const res = await instance.post(COMPANY_ENDPOINTS.CREATE_COMPANY, {
      json: payload,
    });
    console.log(res);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Something went wrong');
    }

    return res.json();
  },

  get: async () => {
    const res = await instance.get(COMPANY_ENDPOINTS.GET_COMPANIES);
    return res.json();
  },

  getWithId: async (id) => {
    const res = await instance.get(COMPANY_ENDPOINTS.GET_COMPANY.replace(":id", id));
    return res.json();
  },

  update: async (id, payload) => {
    const res = await instance.put(COMPANY_ENDPOINTS.UPDATE_COMPANY.replace(":id", id), {
      json: payload,
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await instance.delete(COMPANY_ENDPOINTS.DELETE_COMPANY.replace(":id", id));
    return res.json();
  },
};