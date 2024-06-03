import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import SearchBar from "../../../../app/common/form/SearchBar.tsx";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

const OrderFilters: React.FC = () => {
  const { orderStore } = useStore();
  const {
    orderNumberFilter,
    isApprovedFilter,
    loadingFilters,
    clients,
    clientFilter,
    users,
    userFilter,
    loadActiveClients,
    setOrderNumberFilter,
    setIsApprovedFilter,
    setPagingParams,
    loadOrders,
    setClientFilter,
    loadActiveUsers,
    setUserFilter,
  } = orderStore;

  const loadFilteredOrders = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: orderStore.pagingParams.pageSize,
    });
    loadOrders();
  };

  const handleOrderNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderNumberFilter(event.target.value);
    loadFilteredOrders();
  };

  const handleIsApprovedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsApprovedFilter(event.target.checked);
    loadFilteredOrders();
  };

  const handleClientChange = (event: SelectChangeEvent<string>) => {
    setClientFilter(event.target.value as string);
    loadFilteredOrders();
  };

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setUserFilter(event.target.value as string);
    loadFilteredOrders();
  };

  useEffect(() => {
    loadActiveClients();
    loadActiveUsers();
  }, [loadActiveClients, loadActiveUsers]);

  if (loadingFilters) return <CircularProgress />;

  return (
    <div>
      <div className="order-filters">
        <SearchBar
          label="Search by order number"
          value={orderNumberFilter}
          onChange={handleOrderNumberChange}
          className="search-bar"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isApprovedFilter}
              onChange={handleIsApprovedChange}
            />
          }
          label="Approved"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Client</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={clientFilter}
            onChange={handleClientChange}
            className="client-select"
            label="Client"
            style={{ width: "200px" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {clients?.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userFilter}
            onChange={handleUserChange}
            className="user-select"
            label="User"
            style={{ width: "200px" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {users?.map((user) => (
              <MenuItem key={user.userName} value={user.userName}>
                {user.userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default observer(OrderFilters);
