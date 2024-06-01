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
  Pagination,
  Box,
  CircularProgress,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store.ts";

const PlaceOrderList: React.FC = () => {
  const { productStore, cartStore } = useStore();
  const {
    setPagingParams,
    loadProducts,
    removePlaceOrderProductFromCart,
    addPlaceOrderProductToCart,
    pagination,
    products,
    placeOrderProducts,
    pagingParams,
    loadingInitial,
  } = productStore;
  const { addItemToCart, removeItemFromCart } = cartStore;

  const navigateToHome = (pageNumber: number) => {
    setPagingParams({
      pageNumber: pageNumber,
      pageSize: pagingParams.pageSize,
    });
    loadProducts();
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => navigateToHome(value);

  const handleRemoveFromCart = (id: string) => {
    removeItemFromCart(id);
    removePlaceOrderProductFromCart(id);
  };

  const handleAddItemToCart = (id: string, qty: number, byCase: boolean) => {
    console.log(id, qty, byCase);
    addItemToCart(products.find((product) => product.id === id)!, qty, byCase);
    addPlaceOrderProductToCart(id);
  };

  const handleByCaseChange = (id: string, byCase: boolean) => {
    // Update the byCase property of the product with the given id
    const product = placeOrderProducts.find((item) => item.id === id);
    if (product) {
      product.byCase = byCase;
    }
  };

  const handleQuantityChange = (id: string, qty: number) => {
    // Update the quantity of the product with the given id
    const product = placeOrderProducts.find((item) => item.id === id);
    if (product) {
      product.quantity = qty;
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Code
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Unit Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Unit Weight
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Items in Case
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Case Price
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Case / Unit
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Add To Cart
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeOrderProducts &&
              placeOrderProducts.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)", // Change this to the color you want
                    },
                  }}
                >
                  <TableCell>
                    <img
                      src="/candy.png"
                      alt={item.product.name}
                      style={{ width: 90 }}
                    />
                  </TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.code}</TableCell>
                  <TableCell>${item.product.unitPrice}</TableCell>
                  <TableCell>{item.product.unitWeight}g</TableCell>
                  <TableCell>{item.product.itemsInCase}</TableCell>
                  <TableCell>${item.product.casePrice}</TableCell>
                  <TableCell>{item.product.category.name}</TableCell>
                  <TableCell>
                    {!item.addedToCart && (
                      <RadioGroup
                        row
                        value={item.byCase ? "Case" : "Unit"}
                        onChange={(event) =>
                          handleByCaseChange(
                            item.id,
                            event.target.value === "Case"
                          )
                        }
                        sx={{ flexDirection: "row", flexWrap: "nowrap" }}
                      >
                        <FormControlLabel
                          value="Case"
                          control={<Radio />}
                          label={<Typography variant="body2">Case</Typography>}
                        />
                        <FormControlLabel
                          value="Unit"
                          control={<Radio />}
                          label={<Typography variant="body2">Unit</Typography>}
                        />
                      </RadioGroup>
                    )}
                  </TableCell>
                  <TableCell>
                    {!item.addedToCart && (
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
                          height: "2rem",
                          py: 0,
                          ml: 1,
                        }}
                      >
                        {[...Array(30).keys()].map((value) => (
                          <MenuItem key={value} value={value + 1}>
                            {value + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.addedToCart ? (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ alignSelf: "baseline" }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ alignSelf: "baseline", fontSize: "0.8rem" }}
                        onClick={() =>
                          handleAddItemToCart(
                            item.id,
                            item.quantity,
                            item.byCase
                          )
                        }
                      >
                        Add
                      </Button>
                    )}
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

export default observer(PlaceOrderList);
