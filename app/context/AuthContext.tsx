"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi, tokenStore } from "../lib/api";

type User = {
  id: string;
  role: "ARTISAN" | "CLIENT" | "ADMIN";
  companyName?: string | null;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerArtisan: (companyName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // au chargement : si un token existe, récupérer /auth/me
  useEffect(() => {
    const t = tokenStore.get();
    if (!t) return setLoading(false);
    setToken(t);
    authApi
      .me()
      .then((u) => setUser(u))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await authApi.login(email, password);
    tokenStore.set(token);
    setToken(token);
    setUser(user);
  };

  const registerArtisan = async (companyName: string, email: string, password: string) => {
    const { token, user } = await authApi.registerArtisan(companyName, email, password);
    tokenStore.set(token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    tokenStore.clear();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, registerArtisan, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
