import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import OrderFilters from "./OrderFilters.tsx";
import OrderList from "./OrderList.tsx";
import "./styles.css";

const OrderDashboard: React.FC = () => {
  return (
    <div>
      <h1>Orders</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <OrderFilters />
      </Box>
      <OrderList />
    </div>
  );
};

export default observer(OrderDashboard);
