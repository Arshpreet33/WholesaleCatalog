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

const ManufacturerDetails: React.FC<{}> = () => {
  const { manufacturerStore } = useStore();
  const { loadManufacturerById, loadingInitial, selectedManufacturer } =
    manufacturerStore;

  const { id } = useParams();

  useEffect(() => {
    const loadManufacturerDetails = async () => {
      await loadManufacturerById(id ?? "");
    };

    if (id) {
      loadManufacturerDetails();
    }
  }, [id, loadManufacturerById]);

  if (loadingInitial || !selectedManufacturer) return <CircularProgress />;

  const { name, description, imageUrl, isActive } = selectedManufacturer;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Manufacturer Details
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Active: {isActive.toString()}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/admin/manufacturers/edit/${id}`}
            sx={{ marginTop: 2 }}
          >
            Edit Manufacturer
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default observer(ManufacturerDetails);
