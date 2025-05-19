import { jwtDecode } from "jwt-decode";
import ky from "ky";
// import jwtDecode from "jwt-decode";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const tokenService = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setAccessToken: (token) => localStorage.setItem('accessToken', token),
  setRefreshToken: (token) => localStorage.setItem('refreshToken', token),
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Foydalanuvchi holatini (context/store) ham tozalash kerak bo'lishi mumkin
    window.dispatchEvent(new Event('auth-logout')); // Logout uchun global hodisa
  },
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return true;
    }
    return false;
  } catch (e) {
    console.error('Error decoding token:', e);
    return true;
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Refresh token uchun alohida `ky` instansi, interceptorlar tsikliga tushib qolmaslik uchun
const refreshInstance = ky.create({
  prefixUrl: VITE_API_URL,
});

export const instance = ky.create({
  prefixUrl: VITE_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token = tokenService.getAccessToken();

        // Agar so'rov refresh endpointiga ketayotgan bo'lsa, unga token qo'shmaymiz (agar kerak bo'lmasa)
        // Yoki refresh tokenning o'zini body/header orqali yuborish kerak bo'lsa, shunga moslash kerak.
        // Hozirgi authService.refreshToken() hech qanday payload olmayapti, server tomonida refresh tokenni cookie yoki boshqa usulda olishi mumkin.
        // Agar refresh token API ga JSON payload orqali yuborilishi kerak bo'lsa:
        // const currentRefreshToken = tokenService.getRefreshToken();
        // if (request.url.endsWith(AUTH_ENDPOINTS.REFRESH_TOKEN)) {
        //   // Bu yerda logikani o'zgartirish kerak bo'lishi mumkin, refresh_token qanday yuborilishiga qarab.
        //   // Masalan, agar u headerda emas, bodyda kutilsa.
        //   // Hozirgi `authService.refreshToken` `instance.post` ni ishlatadi, bu tsiklga olib kelishi mumkin.
        //   // Shuning uchun `refreshInstance` ishlatgan ma'qul.
        //   return;
        // }

        if (token && isTokenExpired(token)) {
          const refreshTokenVal = tokenService.getRefreshToken();
          if (refreshTokenVal && !isTokenExpired(refreshTokenVal)) { // Refresh token ham yaroqli ekanligini tekshiramiz
            if (!isRefreshing) {
              isRefreshing = true;
              try {
                console.log('Refreshing access token...');
                // `authService.refreshToken` o'rniga to'g'ridan-to'g'ri `refreshInstance` dan foydalanamiz
                // Server refresh tokeni qanday qabul qilishiga e'tibor bering (odatda JSON body da)
                const response = await refreshInstance.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
                  // Agar server refresh tokenni JSON bodyda kutsa:
                  json: { refresh: refreshTokenVal }
                  // Agar server boshqacha kutsa (masalan, header yoki cookie orqali), shuni moslashtiring
                }).json();

                const newAccessToken = response.access; // Yoki sizning API javobingizdagi token nomi
                // const newRefreshToken = response.refresh; // Agar yangi refresh token ham kelsa

                if (newAccessToken) {
                  tokenService.setAccessToken(newAccessToken);
                  // if (newRefreshToken) tokenService.setRefreshToken(newRefreshToken);
                  token = newAccessToken;
                  processQueue(null, token);
                } else {
                  throw new Error('No new access token received');
                }
              } catch (error) {
                console.error('Failed to refresh token:', error);
                tokenService.clearTokens(); // Tokenlarni tozalaymiz
                // Foydalanuvchini login sahifasiga yo'naltirish kerak
                processQueue(error, null);
                // window.location.href = '/login'; // Yoki UserContext orqali
                throw error; // Asl so'rov ham xatolik bilan tugashi uchun
              } finally {
                isRefreshing = false;
              }
            } else {
              // Agar token allaqachon yangilanayotgan bo'lsa, kutamiz
              try {
                token = await new Promise((resolve, reject) => {
                  failedQueue.push({ resolve, reject });
                });
              } catch (error) {
                // Yangilashda xatolik yuz bersa
                console.error('Waiting for refresh failed:', error);
                throw error;
              }
            }
          } else {
            // Yaroqli refresh token yo'q, tizimdan chiqaramiz
            console.log('No valid refresh token available. Logging out.');
            tokenService.clearTokens();
            token = null; // Eski tokenni yubormaslik uchun
            // window.location.href = '/login'; // Yoki UserContext orqali
          }
        }

        if (token && !request.headers.has('Authorization')) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 401 (Unauthorized) xatoligini ushlash
        if (response.status === 401) {
          // Refresh token endpointining o'zi 401 qaytarsa, qayta urinmaymiz
          if (request.url.endsWith(AUTH_ENDPOINTS.REFRESH_TOKEN)) {
            console.error('Refresh token request itself failed with 401.');
            tokenService.clearTokens();
            // window.location.href = '/login';
            return response; // Yoki xatolikni qayta throw qilish
          }

          console.warn('Received 401 Unauthorized. Token might be invalid or expired.');
          // beforeRequest dagi logika ko'p holatlarni qoplashi kerak.
          // Agar bu yerga kelsa, demak tokenni yangilab bo'lmadi yoki boshqa muammo.
          // Bu yerda qo'shimcha ravishda refreshga urinish mumkin, lekin beforeRequest bilan sinxronlash kerak.
          // Hozirgi holatda, agar beforeRequest ishlamasa, bu yerda logout qilish logik.
          tokenService.clearTokens();
          // window.location.href = '/login'; // Yoki UserContext orqali
          // Xatolikni qayta throw qilish yoki o'zgartirilgan response qaytarish mumkin
          throw new ky.HTTPError(response, request, options); // Asl xatolikni qaytaramiz
        }
        return response;
      },
    ],
  },
});
