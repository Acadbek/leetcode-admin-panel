// src/api/auth-service.js
import { AUTH_ENDPOINTS } from '@/api/endpoints';
import { instance } from '@/api/ky-instance'; // Asosiy instance
import ky from 'ky';
// refreshInstance ni ham import qilish yoki ky-instance.js dan export qilish kerak bo'lishi mumkin,
// lekin hozir refresh logikasi ky-instance ichida joylashgan.

const VITE_API_URL = import.meta.env.VITE_API_URL; // Agar refreshInstance bu yerda yaratilsa
const refreshKyInstance = ky.create({ prefixUrl: VITE_API_URL }); // Interceptorlarsiz alohida instance

export const authService = {
  login: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.LOGIN, { json: payload });
    const data = await res.json();
    if (data.accessToken) { // Yoki sizning API javobingizdagi token nomi (masalan, `access` yoki `token`)
      localStorage.setItem('accessToken', data.accessToken);
      if (data.refreshToken) { // Yoki `refresh`
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      // UserContext ni yangilash kerak (masalan, dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });)
      window.dispatchEvent(new CustomEvent('auth-login', { detail: data.user }));
    }
    return data;
  },

  logout: async () => {
    // Server tomonida tokenni bekor qilish (ixtiyoriy, lekin tavsiya etiladi)
    try {
      // Agar logout endpointi bo'lsa va u tokenni talab qilsa, `instance` ni ishlating
      // Agar tokenni talab qilmasa yoki xavfsizlik uchun tokenni yubormoqchi bo'lmasangiz:
      // await ky.post(`${VITE_API_URL}${AUTH_ENDPOINTS.LOGOUT}`);
      await instance.post(AUTH_ENDPOINTS.LOGOUT); // Agar server logoutni qo'llab-quvvatlasa
    } catch (error) {
      console.warn('Logout API call failed or not implemented:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // UserContext ni yangilash kerak (masalan, dispatch({ type: 'LOGOUT' });)
      window.dispatchEvent(new Event('auth-logout'));
    }
    // Odatda logout funksiyasi hech narsa qaytarmaydi yoki muvaffaqiyat statusini qaytaradi
    return Promise.resolve();
  },

  me: async () => {
    const res = await instance.get(AUTH_ENDPOINTS.ME);
    return res.json();
  },

  // Bu funksiya endi asosan ky-instance.js ichidagi interceptor tomonidan chaqiriladi.
  // Agar tashqaridan ham chaqirish kerak bo'lsa, u `refreshKyInstance` ni ishlatishi kerak.
  refreshToken: async () => {
    const refreshTokenVal = localStorage.getItem('refreshToken');
    if (!refreshTokenVal) {
      throw new Error('No refresh token found');
    }
    const res = await refreshKyInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
      json: { refresh: refreshTokenVal } 
    });
    const data = await res.json();
    if (data.access) { // Yoki `accessToken`
      localStorage.setItem('accessToken', data.access);
      // Agar yangi refresh token ham kelsa:
      // if (data.refresh) localStorage.setItem('refreshToken', data.refresh);
    }
    return data;
  },

  forgotPassword: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
      json: payload,
    });
    return res.json();
  },

  resetPassword: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
      json: payload,
    });
    return res.json();
  },

  changePassword: async (payload) => {
    const res = await instance.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, {
      json: payload,
    });
    return res.json();
  },
};