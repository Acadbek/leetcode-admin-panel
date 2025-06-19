import { COMPANY_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance';
import { toast } from 'sonner';

export const companyService = {
  create: async (payload) => {
    try {
      const res = await instance.post(COMPANY_ENDPOINTS.CREATE_COMPANY, {
        json: payload,
      });
      console.log(res);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Something went wrong');
      }

      toast.success("Kompaniya muvaffaqiyatli yaratildi.");


      return res.json();
    } catch (error) {
      if (error.message === 'errors.company-with-email-already-exists.message') {
        toast.error("❗ Bu email manzili bilan kompaniya allaqachon ro'yxatdan o'tgan.");
      } else {
        toast.error("❗ Nomaʼlum xatolik: " + error.message);
      }
    }
  },

  get: async () => {
    try {
      const res = await instance.get(COMPANY_ENDPOINTS.GET_COMPANIES);
      return res.json();

    } catch (error) {
      const status = error.response?.status;

      if (status === 500) {
        toast.error("Serverda ichki xatolik yuz berdi.");
      } else if (status === 404) {
        toast.error("Ma'lumot topilmadi.");
      } else if (status === 401) {
        toast.error("Avtorizatsiyadan o‘ting.");
      } else {
        toast.error("Noma'lum xatolik yuz berdi." + (error.message || "Xatolik yuz berdi"));
      }
    }
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