import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import MyOrderFilters from "./MyOrderFilters";
import MyOrderList from "./MyOrderList";

const MyOrderDashboard: React.FC = () => {
  return (
    <div>
      <h1>Products</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <MyOrderFilters />
      </Box>
      <MyOrderList />
      <Outlet />
    </div>
  );
};

export default observer(MyOrderDashboard);
