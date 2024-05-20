import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

const ProductDetails: React.FC<{}> = () => {
  const { productStore } = useStore();
  const { loadProductById, loadingInitial, selectedProduct } = productStore;

  const { id } = useParams();

  useEffect(() => {
    const loadProductDetails = async () => {
      await loadProductById(id ?? "");
    };

    if (id) {
      loadProductDetails();
    }
  }, [id, loadProductById]);

  if (loadingInitial || !selectedProduct) return <CircularProgress />;

  const {
    name,
    code,
    description,
    unitPrice,
    unitWeight,
    itemsInCase,
    casePrice,
    itemsInStock,
    casesInStock,
    imageUrl,
    isActive,
    category,
  } = selectedProduct;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Product Details
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Name: {name}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Code: {code}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Description: {description}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Unit Price: ${unitPrice}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Unit Weight: {unitWeight}g
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Items in Case: {itemsInCase}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Case Price: ${casePrice}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Items in Stock: {itemsInStock}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Cases in Stock: {casesInStock}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Image:{" "}
                <img
                  src={imageUrl}
                  alt={name}
                  style={{ width: "50px", height: "50px" }}
                />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Active: {isActive.toString()}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Category ID: {category.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={6} sx={{ marginTop: 1 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/admin/products/edit/${id}`}
              >
                Edit Product
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="error"
                component={Link}
                to={`/admin/products`}
              >
                Back to List
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default observer(ProductDetails);
