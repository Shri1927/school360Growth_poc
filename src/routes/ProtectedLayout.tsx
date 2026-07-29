import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth, roleHomePath } from "@/context/AuthContext";
import type { UserRole } from "@/types";

export function ProtectedLayout() {
  const { session } = useAuth();
  if (!session) return <Navigate to="/" replace />;
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export function RoleGuard({ role, children }: { role: UserRole; children: ReactNode }) {  const { session } = useAuth();
  if (!session) return <Navigate to="/" replace />;
  if (session.role !== role) return <Navigate to={roleHomePath(session.role)} replace />;
  return <>{children}</>;
}
