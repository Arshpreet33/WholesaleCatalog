import React from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import MyOrderFilters from "./MyOrderFilters.tsx";
import MyOrderList from "./MyOrderList.tsx";
import "./styles.css";

const MyOrderDashboard: React.FC = () => {
  return (
    <div>
      <h1>My Orders</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <MyOrderFilters />
      </Box>
      <MyOrderList />
    </div>
  );
};

export default observer(MyOrderDashboard);
