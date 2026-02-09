import React, { createContext, useContext, useState } from 'react'

export interface AuthContextType {
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (newAccessToken: string, newRefreshToken: string) => void;
  revoke: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('use auth context looks like ', context);
  if (context == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("ewtoken"));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("ewrefresh"));

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken)
    localStorage.setItem("ewtoken", newAccessToken);
    localStorage.setItem("ewrefresh", newRefreshToken);
  };

  const revoke = () => {
    setUserId(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("ewtoken");
    localStorage.removeItem("ewrefresh");
  };

  const value: AuthContextType = {
    userId, // need to set this still
    accessToken,
    refreshToken,
    setTokens,
    revoke
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};