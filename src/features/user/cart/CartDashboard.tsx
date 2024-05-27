import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStore } from "../../../app/stores/store.ts";

const CartDashboard: React.FC = () => {
  const { cartStore, commonStore } = useStore();
  const { selectedClient, isOrderMode } = commonStore;
  const { cartItems, updateItemQuantity, removeItemFromCart } = cartStore;
  const totalPrice = cartStore.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    updateItemQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItemFromCart(id);
  };

  return isOrderMode ? (
    <Box>
      <Typography variant="h4">Client: {selectedClient?.name}</Typography>
      <Typography variant="h4">
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>

      {cartItems.map((item) => (
        <Card key={item.id}>
          <CardMedia
            component="img"
            height="140"
            image={item.product.imageUrl} // Replace with your actual image URL
            alt={item.product.name}
          />
          <CardContent>
            <Typography variant="h5">{item.product.name}</Typography>
            <Typography variant="body2">{item.product.description}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => handleRemoveItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
            <Select
              value={item.quantity}
              onChange={(event) =>
                handleQuantityChange(item.id, event.target.value as number)
              }
            >
              {[...Array(30).keys()].map((value) => (
                <MenuItem key={value} value={value + 1}>
                  {value + 1}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="h6">
              ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h4">
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary">
        Place Order
      </Button>
      <Button variant="contained" color="secondary">
        Add More Items
      </Button>
    </Box>
  ) : (
    <Box>
      <Typography variant="h4">
        Go to Place order page to select client
      </Typography>
    </Box>
  );
};

export default CartDashboard;
