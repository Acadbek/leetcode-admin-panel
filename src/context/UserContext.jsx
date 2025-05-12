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

  useEffect(() => {
    const token = storage.getItem("accessToken");
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isAuthenticated: !!user }}
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
