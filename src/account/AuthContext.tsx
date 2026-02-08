import React, { createContext, useState } from 'react'

interface AuthContextType {
  user: string | null;
  token: string | null;
  refresh: (newToken: string, newUser: string) => void;
  revoke: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("site"));

  const refresh = (newToken: string, newUser: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("ewkey", newToken);
  };

  const revoke = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ewkey");
  };

  const value: AuthContextType = {
    user,
    token,
    refresh,
    revoke
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};