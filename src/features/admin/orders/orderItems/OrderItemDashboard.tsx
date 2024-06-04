import React, { useEffect } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/store.ts";
import OrderItemList from "./OrderItemList.tsx";

const OrderItemDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { orderStore } = useStore();
  const { loadOrderById, setPagingParams, loadingFilters, selectedOrder } =
    orderStore;

  const handleBackClick = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: orderStore.pagingParams.pageSize,
    });
    navigate("/admin/orders");
  };

  useEffect(() => {
    loadOrderById(id ?? "");
  }, [loadOrderById, id]);

  if (loadingFilters) return <CircularProgress />;

  return (
    <div>
      <h1>Order Items</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Order Number: {selectedOrder?.orderNumber}</h2>
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Back to Orders List
        </Button>
      </Box>
      <OrderItemList orderId={id ?? selectedOrder?.id ?? ""} />
    </div>
  );
};

export default observer(OrderItemDashboard);
