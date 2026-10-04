import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export default function RequireRole({ children, allowedRoles, redirectTo = "/" }: RequireRoleProps) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role || "")) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}