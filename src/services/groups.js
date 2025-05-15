import { GROUP_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';

export const groupsService = {
  create: async (payload) => {
    const res = await instance.post(GROUP_ENDPOINTS.CREATE_GROUP, {
      json: payload,
    });

    return res;
  },

  get: async () => {
    const res = await instance.get(GROUP_ENDPOINTS.GET_GROUPS);
    return res;
  },

  getWithCompanyId: async (companyId) => {
    const res = await instance.get(
      GROUP_ENDPOINTS.GET_GROUPS_WITH_COMPANY_ID.replace(
        ':companyId',
        companyId
      )
    );
    return res;
  },

  getWithId: async (id) => {
    const res = await instance.get(
      GROUP_ENDPOINTS.GET_GROUP.replace(':id', id)
    );
    return res;
  },

  update: async (id, payload) => {
    const res = await instance.put(
      GROUP_ENDPOINTS.UPDATE_GROUP.replace(':id', id),
      {
        json: payload,
      }
    );
    return res;
  },

  remove: async (id) => {
    const res = await instance.delete(
      GROUP_ENDPOINTS.DELETE_GROUP.replace(':id', id)
    );
    return res;
  },
};
