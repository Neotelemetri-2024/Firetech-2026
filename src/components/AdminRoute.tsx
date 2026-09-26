import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const userString = localStorage.getItem("user");

  if (!userString) {
    return <Navigate to="/home" replace />;
  }

  const user = JSON.parse(userString);

  const role = String(user?.role || "").toUpperCase();

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
