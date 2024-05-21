import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../stores/store.ts";
import { observer } from "mobx-react-lite";
import { CircularProgress } from "@mui/material";

interface RequireAuthProps {
  role?: string;
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ role, children }) => {
  const { commonStore, userStore } = useStore();

  const { isLoggedIn, user, getUser } = userStore;

  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) getUser().finally(() => commonStore.setAppLoaded());
    else commonStore.setAppLoaded();
  }, [commonStore, getUser]);

  if (!commonStore.appLoaded) {
    return <CircularProgress />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/un-authorized" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default observer(RequireAuth);
