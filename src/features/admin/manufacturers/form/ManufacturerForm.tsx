import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, CircularProgress, Grid } from "@mui/material";
import * as Yup from "yup";
import { ManufacturerFormValues } from "../../../../app/models/manufacturer.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../../../app/common/form/MyTextInput.tsx";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";

const enum DISPLAY_NAMES {
  name = "Name",
  description = "Description",
  imageUrl = "Image URL",
}

const enum FIELD_NAMES {
  name = "name",
  description = "description",
  imageUrl = "imageUrl",
}

const ManufacturerForm: React.FC = () => {
  const navigate = useNavigate();
  const { manufacturerStore } = useStore();
  const {
    loadManufacturerById,
    updateManufacturer,
    saveManufacturer,
    editMode,
    setEditMode,
    loadingInitial,
  } = manufacturerStore;
  const [manufacturer, setManufacturer] =
    useState<ManufacturerFormValues | null>(null);

  const { id } = useParams();

  const handleCreateOrEditManufacturer = (
    manufacturer: ManufacturerFormValues
  ) => {
    if (manufacturer.id) {
      updateManufacturer(manufacturer).then(() =>
        navigate(`/admin/manufacturers`)
      );
    } else {
      manufacturer.id = uuid();
      saveManufacturer(manufacturer).then(() =>
        navigate(`/admin/manufacturers`)
      );
    }
  };

  useEffect(() => {
    if (id) {
      loadManufacturerById(id).then((manufacturer) => {
        setManufacturer(new ManufacturerFormValues(manufacturer));
      });
      setEditMode(true);
    } else {
      setManufacturer(new ManufacturerFormValues());
      setEditMode(false);
    }
  }, [id, loadManufacturerById, setEditMode]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    imageUrl: Yup.string().url("Invalid URL"),
  });

  if (editMode && (loadingInitial || !manufacturer))
    return <CircularProgress />;

  return (
    manufacturer && (
      <>
        <h1>{editMode ? "Edit Manufacturer" : "Add Manufacturer"}</h1>
        <Formik
          initialValues={manufacturer}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateOrEditManufacturer(values);
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.name}
                    label={DISPLAY_NAMES.name}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.description}
                    label={DISPLAY_NAMES.description}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.imageUrl}
                    label={DISPLAY_NAMES.imageUrl}
                  />
                </Grid>

                <Grid item container spacing={8}>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting || !dirty || !isValid}
                    >
                      {editMode ? "Save" : "Add"}
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      component={Link}
                      to={`/admin/manufacturers`}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </>
    )
  );
};

export default observer(ManufacturerForm);
