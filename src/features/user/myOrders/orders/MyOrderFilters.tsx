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

const MyOrderFilters: React.FC = () => {
  const { orderStore } = useStore();
  const {
    orderNumberFilter,
    isApprovedFilter,
    loadingFilters,
    clients,
    clientFilter,
    loadActiveClients,
    setOrderNumberFilter,
    setIsApprovedFilter,
    setPagingParams,
    loadOrders,
    setClientFilter,
    loadActiveUsers,
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

  useEffect(() => {
    loadActiveClients();
    loadActiveUsers();
  }, [loadActiveClients, loadActiveUsers]);

  if (loadingFilters) return <CircularProgress />;

  return (
    <div>
      <div className="my-order-filters">
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
      </div>
    </div>
  );
};

export default observer(MyOrderFilters);
