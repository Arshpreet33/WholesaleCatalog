import React from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const CartDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { cartStore, commonStore, orderStore } = useStore();
  const { selectedClient, isOrderMode } = commonStore;
  const {
    cartItems,
    totalItems,
    totalPrice,
    updateItemQuantity,
    removeItemFromCart,
  } = cartStore;
  const { saveOrder, createOrderModel } = orderStore;

  // const totalPrice = cartStore.cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  const handleQuantityChange = (id: string, quantity: number) => {
    updateItemQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItemFromCart(id);
  };

  const handleCreateOrder = async () => {
    const newOrder = createOrderModel(cartItems, selectedClient!);
    await saveOrder(newOrder);
    cartStore.clearCart();
    commonStore.setOrderMode(false);
    commonStore.setSelectedClient(null);
    navigate("/user/myorders");
  };

  return isOrderMode ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <h1>Cart</h1>
        <h2>Client: {selectedClient?.name}</h2>
      </Grid>
      {cartItems.length === 0 ? (
        <Grid item xs={12} md={12}>
          <h6>Cart is empty. Please add items to cart.</h6>
        </Grid>
      ) : (
        <>
          <Grid item xs={12} md={9}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{ display: "flex", mb: 4, p: 2, maxWidth: "100%" }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 140 }}
                  image={item.product.imageUrl}
                  alt={item.product.name}
                />
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                  <Typography variant="body1">
                    {item.product.name} ({item.byCase ? "Case" : "Unit"})
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Select
                      value={item.quantity}
                      onChange={(event) =>
                        handleQuantityChange(
                          item.id,
                          event.target.value as number
                        )
                      }
                      sx={{
                        fontSize: "0.8rem",
                        height: "1.8rem",
                        py: 0,
                        ml: 2,
                      }}
                    >
                      {[...Array(30).keys()].map((value) => (
                        <MenuItem key={value} value={value + 1}>
                          {value + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{ alignSelf: "flex-start", fontWeight: "bold", ml: 2 }}
                >
                  ${item.price.toFixed(2)}
                </Typography>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, width: "300px", ml: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1">
                  Subtotal ({totalItems} items):
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    ml: 1,
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
                onClick={handleCreateOrder}
              >
                Create Order
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              justifyContent="flex-end"
            >
              <Typography variant="body1">
                Subtotal ({totalItems} items):
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  ml: 1,
                }}
              >
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  ) : (
    <Box>
      <Typography variant="h4">
        Go to Place Order page & Select a client
      </Typography>
    </Box>
  );
};

export default observer(CartDashboard);
