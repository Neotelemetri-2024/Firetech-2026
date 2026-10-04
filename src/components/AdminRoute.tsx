import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const accessToken = localStorage.getItem("accessToken");
  const userString = localStorage.getItem("user");

  if (!accessToken || !userString) {
    return <Navigate to="/login" replace />;
  }

  let user: { role?: unknown } | null = null;
  try {
    const parsedUser: unknown = JSON.parse(userString);
    if (parsedUser && typeof parsedUser === "object") {
      user = parsedUser as { role?: unknown };
    }
  } catch {
    user = null;
  }

  if (!user) return <Navigate to="/login" replace />;

  const role = String(user.role || "").toUpperCase();

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return <Navigate to="/home" replace />;
    
  }

  return <>{children}</>;
}
