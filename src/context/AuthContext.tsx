"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type User = {
  name: string;
  email: string;
  password: string;
};
type UserDataType = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLoginDate: string;
  lastLogin: string;
  status: string;
  usageCount: string;
  ip: string;
  signups: string;
};
type context = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
};
// Auth Context
const AuthContext = createContext<context>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

// Provider Component
export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Simulate authentication state
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // logic to log user out after 1min of inactivity :
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session") || "{}");

    if (!session.rememberMe) {
      let timeout: any;

      const logout = () => {
        localStorage.removeItem("session");
        router.push("/");
        toast.info("You’ve been logged out due to inactivity");
      };

      const resetTimer = () => {
        clearTimeout(timeout);
        timeout = setTimeout(logout, 10000); // 1 minute
      };

      // Track events that mean "activity"
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("click", resetTimer);

      resetTimer();

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
        window.removeEventListener("click", resetTimer);
      };
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
