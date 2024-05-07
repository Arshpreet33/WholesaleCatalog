import React from "react";
import ManufacturerList from "./ManufacturerList.tsx";
import ManufacturerFilters from "./ManufacturerFilters.tsx";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";

const ManufacturerDashboard: React.FC = () => {
  return (
    <div>
      <h1>Manufacturers</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ManufacturerFilters />
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
      <ManufacturerList />
      <Outlet />
    </div>
  );
};

export default observer(ManufacturerDashboard);
