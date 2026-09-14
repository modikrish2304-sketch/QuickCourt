import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

export interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<User>;
  initiateSignup: (data: {
    fullName: string;
    email: string;
    password?: string;
    role?: UserRole;
    avatar?: string;
  }) => Promise<{ email: string; demoOtp: string }>;
  register: (data: any) => Promise<{ email: string; demoOtp: string }>;
  verifyOtp: (email: string, otp: string) => Promise<User>;
  resendOtp: (email: string) => Promise<string>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<User>) => Promise<User>;
  updateUser: (updates: Partial<User>) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    return authService.getCurrentUser();
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && (!user || user.id !== currentUser.id)) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<User> => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const initiateSignup = async (data: {
    fullName: string;
    email: string;
    password?: string;
    role?: UserRole;
  }) => {
    setIsLoading(true);
    try {
      return await authService.signup(data);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: any) => {
    return initiateSignup({
      fullName: payload.name || payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role as UserRole,
    });
  };

  const verifyOtp = async (email: string, otp: string): Promise<User> => {
    setIsLoading(true);
    try {
      const verifiedUser = await authService.verifyOtp(email, otp);
      setUser(verifiedUser);
      return verifiedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async (email: string): Promise<string> => {
    return authService.resendOtp(email);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const switchDemoRole = (newRole: UserRole) => {
    const updated = authService.switchDemoRole(newRole);
    setUser({ ...updated });
  };

  const updateProfile = async (updates: Partial<User>): Promise<User> => {
    if (!user) throw new Error('No authenticated user');
    const updated = await authService.updateUser(user.id, updates);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        initiateSignup,
        register,
        verifyOtp,
        resendOtp,
        logout,
        switchDemoRole,
        switchRole: switchDemoRole,
        updateProfile,
        updateUser: updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
