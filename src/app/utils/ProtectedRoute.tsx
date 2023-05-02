import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/store";
import { useEffect, useState } from "react";
import { Roles } from "@/features/auth/types";

interface ProtectedRouteProps {
  allowedRoles: Roles[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { auth } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  useEffect(() => {
    if (auth.user && auth.user.role) {
      const hasAccess = allowedRoles.includes(auth.user.role);
      setHasAccess(hasAccess);
    }
  }, [auth, allowedRoles]);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/auth" replace />;
  }

  if (!hasAccess) {
    return <div>You do not have access to this page.</div>;
  }

  return <Outlet />;
};
