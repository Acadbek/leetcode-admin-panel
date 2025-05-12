import storage from "@/api/localStorage";
import { authService } from "@/services/auth-service";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    authService.logout();
    setUser(null);
    storage.clear();
  };

  const fetchUser = async () => {
    try {
      const me = await authService.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = storage.getItem("accessToken");
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, isAuthenticated: !!user }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
