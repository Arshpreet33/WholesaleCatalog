import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStore } from "../../../app/stores/store.ts";
import SelectClientForm from "./SelectClientForm.tsx";
import PlaceOrderList from "./PlaceOrderList.tsx";
import PlaceOrderFilters from "./PlaceOrderFilters.tsx";

const PlaceOrderDashboard: React.FC = () => {
  const { commonStore, productStore, cartStore } = useStore();
  const { isOrderMode, selectedClient } = commonStore;
  const { setPlaceOrderMode } = productStore;

  const handleCancelOrder = () => {
    if (commonStore) {
      commonStore.setOrderMode(false);
      commonStore.setSelectedClient(null);
      cartStore.clearCart();
    } else {
      console.error("commonStore is undefined");
    }
  };

  useEffect(() => {
    setPlaceOrderMode(true);
  }, [setPlaceOrderMode]);

  return (
    <div>
      {isOrderMode ? (
        <>
          <h1>Add Items To Cart</h1>
          <h2>Client: {selectedClient?.name}</h2>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <PlaceOrderFilters />
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              sx={{ alignSelf: "baseline" }}
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          </Box>
          <PlaceOrderList />
          <Outlet />
        </>
      ) : (
        <SelectClientForm />
      )}
    </div>
  );
};

export default observer(PlaceOrderDashboard);
