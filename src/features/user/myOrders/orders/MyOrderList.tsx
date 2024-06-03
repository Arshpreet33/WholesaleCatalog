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
  IconButton,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const MyOrderList: React.FC = () => {
  const { orderStore } = useStore();
  const {
    setPagingParams,
    loadMyOrders,
    pagination,
    orders,
    pagingParams,
    loadingInitial,
  } = orderStore;

  const navigateToHome = (pageNumber: number) => {
    setPagingParams({
      pageNumber: pageNumber,
      pageSize: pagingParams.pageSize,
    });
    loadMyOrders();
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => navigateToHome(value);

  useEffect(() => {
    loadMyOrders();
  }, [loadMyOrders]);

  if (loadingInitial) return <CircularProgress />;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead sx={{ bgcolor: "#525252" }}>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Order Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Order Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Client
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  User
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Sub Total
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Items
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Approved
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Order Items
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // Change this to the color you want
                    },
                  }}
                >
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.orderDate.toDateString()}</TableCell>
                  <TableCell>{order.client.name}</TableCell>
                  <TableCell>{order.user.userName}</TableCell>
                  <TableCell>${order.subTotal}</TableCell>
                  <TableCell>{order.itemsCount}</TableCell>
                  <TableCell>{order.isApproved.toString()}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`${order.id}`}>
                      <OpenInNewIcon />
                    </IconButton>
                  </TableCell>
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

export default observer(MyOrderList);
