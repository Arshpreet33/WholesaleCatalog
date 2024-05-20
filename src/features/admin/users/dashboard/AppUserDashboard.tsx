import React from "react";
import AppUserList from "./AppUserList.tsx";
import AppUserFilters from "./AppUserFilters.tsx";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";

const AppUserDashboard: React.FC = () => {
  return (
    <div>
      <h1>Users</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <AppUserFilters />
        <Button
          component={Link}
          to="create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ alignSelf: "baseline" }}
        >
          Add new
        </Button>
      </Box>
      <AppUserList />
      <Outlet />
    </div>
  );
};

export default observer(AppUserDashboard);
