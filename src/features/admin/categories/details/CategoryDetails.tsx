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

const CategoryDetails: React.FC<{}> = () => {
  const { categoryStore } = useStore();
  const { loadCategoryById, loadingInitial, selectedCategory } = categoryStore;

  const { id } = useParams();

  useEffect(() => {
    const loadCategoryDetails = async () => {
      await loadCategoryById(id ?? "");
    };

    if (id) {
      loadCategoryDetails();
    }
  }, [id, loadCategoryById]);

  if (loadingInitial || !selectedCategory) return <CircularProgress />;

  const { name, description, imageUrl, isActive, manufacturer } =
    selectedCategory;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Category Details
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Name: {name}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Description: {description}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Manufacturer: {manufacturer.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Active: {isActive.toString()}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={6} sx={{ marginTop: 1 }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/admin/categories/edit/${id}`}
              >
                Edit Category
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="error"
                component={Link}
                to={`/admin/categories`}
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

export default observer(CategoryDetails);
