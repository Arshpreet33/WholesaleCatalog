import React from "react";
import { Formik } from "formik";
import { Button, Grid } from "@mui/material";
import * as Yup from "yup";
import ComboBox from "../../../app/common/form/ComboBox.tsx";

const PlaceOrder: React.FC = () => {
  const initialValues = {
    clients: "",
    manufacturers: "",
    categories: "",
    products: "",
  };

  const validationSchema = Yup.object({
    clients: Yup.string().required("Required"),
    manufacturers: Yup.string().required("Required"),
    categories: Yup.string().required("Required"),
    products: Yup.string().required("Required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <>
      <h1>Place Order</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <ComboBox
                  name="clients"
                  label="Clients"
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                />
              </Grid>
              <Grid item>
                <ComboBox
                  name="manufacturers"
                  label="Manufacturers"
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                />
              </Grid>
              <Grid item>
                <ComboBox
                  name="categories"
                  label="Categories"
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                />
              </Grid>
              <Grid item>
                <ComboBox
                  name="products"
                  label="Products"
                  options={[
                    { label: "The Godfather", id: 1 },
                    { label: "Pulp Fiction", id: 2 },
                  ]}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PlaceOrder;
