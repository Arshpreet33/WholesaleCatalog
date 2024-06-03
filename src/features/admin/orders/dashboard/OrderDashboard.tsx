import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import OrderFilters from "./OrderFilters";
import OrderList from "./OrderList";

const OrderDashboard: React.FC = () => {
  return (
    <div>
      <h1>Orders</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <OrderFilters />
      </Box>
      <OrderList />
      <Outlet />
    </div>
  );
};

export default observer(OrderDashboard);
