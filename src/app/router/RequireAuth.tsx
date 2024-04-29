import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store.ts";
import React from "react";

const RequireAuth = () => {
  const {
    userStore: { isLoggedIn },
  } = useStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
