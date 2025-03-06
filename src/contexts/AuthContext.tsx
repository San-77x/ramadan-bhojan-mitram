
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  changePassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll create a mock user
    if (email && password) {
      const mockUser = {
        id: "user_" + Date.now(),
        name: email.split("@")[0],
        email,
        phone: "",
        avatar: "",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call
    if (name && email && password) {
      const mockUser = {
        id: "user_" + Date.now(),
        name,
        email,
        phone: "",
        avatar: "",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } else {
      throw new Error("Please fill all required fields");
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  const updateProfile = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };
  
  const changePassword = async (oldPassword: string, newPassword: string) => {
    // In a real app, this would validate the old password and update to new password
    if (!oldPassword || !newPassword) {
      throw new Error("Please provide both old and new passwords");
    }
    // Password successfully changed simulation
    return Promise.resolve();
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
