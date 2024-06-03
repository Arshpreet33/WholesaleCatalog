import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

interface OrderItemListProps {
  orderId: string;
}

const MyOrderItemList: React.FC<OrderItemListProps> = ({ orderId }) => {
  const { orderStore } = useStore();
  const {
    loadOrderItems,
    setPagingParams,
    pagination,
    orderItems,
    pagingParams,
    loadingInitial,
  } = orderStore;

  const navigateToHome = (pageNumber: number) => {
    setPagingParams({
      pageNumber: pageNumber,
      pageSize: pagingParams.pageSize,
    });
    loadOrderItems(orderId);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => navigateToHome(value);

  useEffect(() => {
    loadOrderItems(orderId);
  }, [loadOrderItems, orderId]);

  if (loadingInitial) return <CircularProgress />;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead sx={{ bgcolor: "#525252" }}>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Product Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Unit Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Total Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Case / Unit
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems &&
              orderItems.map((orderItem) => (
                <TableRow
                  key={orderItem.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // Change this to the color you want
                    },
                  }}
                >
                  <TableCell>
                    <img
                      src="/candy.png"
                      alt={orderItem.product.name}
                      style={{ width: 90 }}
                    />
                  </TableCell>
                  <TableCell>{orderItem.product.name}</TableCell>
                  <TableCell>{orderItem.quantity}</TableCell>
                  <TableCell>${orderItem.unitPrice}</TableCell>
                  <TableCell>${orderItem.totalPrice}</TableCell>
                  <TableCell>{orderItem.byCase ? "Case" : "Unit"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Pagination
          count={pagination ? pagination.totalPages : 0}
          page={pagination ? pagination.currentPage : 1}
          onChange={handlePageChange}
        />
      </Box>
    </div>
  );
};

export default observer(MyOrderItemList);
