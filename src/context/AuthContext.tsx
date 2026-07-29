import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthSession, UserRole } from "@/types";

interface AuthContextValue {
  session: AuthSession | null;
  login: (session: AuthSession) => void;
  logout: () => void;
  switchRole: (session: AuthSession) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    try {
      const raw = sessionStorage.getItem("school360-auth");
      return raw ? (JSON.parse(raw) as AuthSession) : null;
    } catch {
      return null;
    }
  });

  const persist = (s: AuthSession | null) => {
    if (s) sessionStorage.setItem("school360-auth", JSON.stringify(s));
    else sessionStorage.removeItem("school360-auth");
  };

  const login = useCallback((s: AuthSession) => {
    setSession(s);
    persist(s);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    persist(null);
  }, []);

  const switchRole = useCallback((s: AuthSession) => {
    setSession(s);
    persist(s);
  }, []);

  const value = useMemo(
    () => ({ session, login, logout, switchRole }),
    [session, login, logout, switchRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function roleHomePath(role: UserRole): string {
  const map: Record<UserRole, string> = {
    student: "/student",
    parent: "/parent",
    teacher: "/teacher",
    counsellor: "/counsellor",
    principal: "/principal",
    admin: "/admin",
  };
  return map[role];
}
