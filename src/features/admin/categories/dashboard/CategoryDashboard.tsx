import React from "react";
import CategoryList from "./CategoryList.tsx";
import CategoryFilters from "./CategoryFilters.tsx";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";

const CategoryDashboard: React.FC = () => {
  return (
    <div>
      <h1>Categories</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CategoryFilters />
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
      <CategoryList />
      <Outlet />
    </div>
  );
};

export default observer(CategoryDashboard);
