import * as React from "react";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useStore } from "../stores/store.ts";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const App = () => {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token)
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    else commonStore.setAppLoaded();
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) {
    return <CircularProgress />;
  }

  if (userStore.isLoggedIn) {
    return userStore.user?.role === "Admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/user" />
    );
  }

  return <Navigate to="/login" />;
};

export default observer(App);
