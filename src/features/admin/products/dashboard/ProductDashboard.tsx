import React from "react";
import ProductList from "./ProductList.tsx";
import ProductFilters from "./ProductFilters.tsx";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";

const ProductDashboard: React.FC = () => {
  return (
    <div>
      <h1>Products</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ProductFilters />
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
      <ProductList />
      <Outlet />
    </div>
  );
};

export default observer(ProductDashboard);
