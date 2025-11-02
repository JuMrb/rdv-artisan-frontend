"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type UserRole = "client" | "artisan" | "admin" | null;

export type AuthUser = {
  id: string;
  name: string;
  role: UserRole;
  token: string | null;
  statusValidation?: "PENDING" | "APPROVED" | "REJECTED";
} | null;

interface AuthContextType {
  user: AuthUser;
  login: (data: {
    id: string;
    name: string;
    role: UserRole;
    token: string | null;
    statusValidation?: "PENDING" | "APPROVED" | "REJECTED";
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  // au chargement de la page -> récupérer la session depuis le localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("rb_auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
    } catch {}
  }, []);

  function login(data: {
    id: string;
    name: string;
    role: UserRole;
    token: string | null;
    statusValidation?: "PENDING" | "APPROVED" | "REJECTED";
  }) {
    const payload: AuthUser = {
      id: data.id,
      name: data.name,
      role: data.role,
      token: data.token,
      statusValidation: data.statusValidation,
    };

    setUser(payload);
    window.localStorage.setItem("rb_auth", JSON.stringify(payload));
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem("rb_auth");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
