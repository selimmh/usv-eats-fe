import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/store";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { auth, meAsync } = useAuth();

  console.log("me loading", auth.loading);

  useEffect(() => {
    console.log("me async");
    meAsync();
  }, []);

  if (!auth.user && !auth.error) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};
