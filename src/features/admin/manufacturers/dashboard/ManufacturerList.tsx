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
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const ManufacturerList: React.FC = () => {
  const { manufacturerStore } = useStore();
  const {
    setPagingParams,
    deleteManufacturer,
    loadManufacturers,
    toggleActive,
    pagination,
    manufacturers,
    pagingParams,
  } = manufacturerStore;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagingParams({
      pageNumber: value,
      pageSize: pagingParams.pageSize,
    });
    loadManufacturers();
  };

  const handleDelete = (id: string) => {
    deleteManufacturer(id);
  };

  const handleToggle = (id: string) => {
    toggleActive(id).then(() => {
      setPagingParams({
        pageNumber: 1,
        pageSize: pagingParams.pageSize,
      });
      loadManufacturers();
    });
  };

  useEffect(() => {
    loadManufacturers();
  }, [loadManufacturers]);

  if (manufacturerStore.loadingInitial) return <CircularProgress />;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead sx={{ bgcolor: "#525252" }}>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Active
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Edit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Remove
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Details
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
            {manufacturers &&
              manufacturers.map((manufacturer) => (
                <TableRow
                  key={manufacturer.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // Change this to the color you want
                    },
                  }}
                >
                  <TableCell>{manufacturer.name}</TableCell>
                  <TableCell>{manufacturer.description}</TableCell>
                  <TableCell>{manufacturer.isActive.toString()}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`edit/${manufacturer.id}`}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(manufacturer.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`${manufacturer.id}`}>
                      <OpenInNewIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleToggle(manufacturer.id)}>
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

export default observer(ManufacturerList);
