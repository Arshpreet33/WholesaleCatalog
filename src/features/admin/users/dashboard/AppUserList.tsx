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
import EditIcon from "@mui/icons-material/Edit";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const AppUserList: React.FC = () => {
  const { appUserStore } = useStore();
  const {
    setPagingParams,
    loadAppUsers,
    toggleActive,
    pagination,
    appUsers,
    pagingParams,
  } = appUserStore;

  const navigateToHome = (pageNumber: number) => {
    setPagingParams({
      pageNumber: pageNumber,
      pageSize: pagingParams.pageSize,
    });
    loadAppUsers();
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => navigateToHome(value);

  const handleToggle = (userName: string) => {
    toggleActive(userName).then(() => navigateToHome(1));
  };

  useEffect(() => {
    loadAppUsers();
  }, [loadAppUsers]);

  if (appUserStore.loadingInitial) return <CircularProgress />;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead sx={{ bgcolor: "#525252" }}>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  UserName
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Display Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Active
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Bio
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Edit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Toggle
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appUsers &&
              appUsers.map((user) => (
                <TableRow
                  key={user.userName}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // Change this to the color you want
                    },
                  }}
                >
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isActive.toString()}</TableCell>
                  <TableCell>{user.bio}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`edit/${user.userName}`}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleToggle(user.userName)}>
                      <SwapHorizIcon />
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

export default observer(AppUserList);
