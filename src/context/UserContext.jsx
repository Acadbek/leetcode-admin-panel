// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/auth-service';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Dastlabki tekshiruv uchun

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (token && isTokenValid(token)) {
      try {
        setIsLoadingAuth(true);
        const userData = await authService.me(); // "me" endpoint
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to fetch user data or token invalid:', error);
        await handleLogout(false);
      } finally {
        setIsLoadingAuth(false);
      }
    } else {
      await handleLogout(false);
      setIsLoadingAuth(false);
    }
  }, []);


  useEffect(() => {
    fetchUser();

    const handleAuthLogin = async (event) => {
      console.log('UserContext: auth-login event');
      await fetchUser();
    };

    const handleAuthLogout = async () => {
      console.log('UserContext: auth-logout event');
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener('auth-login', handleAuthLogin);
    window.addEventListener('auth-logout', handleAuthLogout);

    return () => {
      window.removeEventListener('auth-login', handleAuthLogin);
      window.removeEventListener('auth-logout', handleAuthLogout);
    };
  }, [fetchUser]);


  const handleLogin = async (credentials) => {
    setIsLoadingAuth(true);
    try {
      const userData = await authService.login(credentials); // authService.login endi tokenlarni saqlaydi va 'auth-login' eventini yuboradi
      // Event listener (yuqoridagi useEffect) fetchUser ni chaqiradi va holatni yangilaydi
      // setUser(userData.user); // Yoki API javobiga qarab
      // setIsAuthenticated(true);
      // Bu qism 'auth-login' eventiga o'tdi
      return userData; // Login komponentiga javob qaytarish
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error; // Xatolikni Login komponentiga qaytarish
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // `callApi` parametri serverga logout so'rovini yuborish kerakligini bildiradi
  const handleLogout = async (callApi = true) => {
    setIsLoadingAuth(true);
    try {
      if (callApi) {
        await authService.logout(); // Bu localStorage ni tozalaydi va 'auth-logout' eventini yuboradi
      } else {
        // Faqat client-side tozalash (agar serverga so'rov kerak bo'lmasa yoki oldin qilingan bo'lsa)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.dispatchEvent(new Event('auth-logout')); // Eventni baribir yuboramiz
      }
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoadingAuth(false);
    }
  };


  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, isLoadingAuth, login: handleLogin, logout: handleLogout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};