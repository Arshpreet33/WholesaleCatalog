import * as React from "react";
import { CircularProgress, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useStore } from "../stores/store.ts";
import LoginForm from "../../features/users/LoginForm.tsx";
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

  return <>{userStore.isLoggedIn ? <Outlet /> : <LoginForm />}</>;
};

export default observer(App);
