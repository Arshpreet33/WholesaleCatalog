import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  Button,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import { CategoryFormValues } from "../../../../app/models/category.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../../../app/common/form/MyTextInput.tsx";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";

const enum DISPLAY_NAMES {
  name = "Name",
  description = "Description",
  imageUrl = "Image URL",
  manufacturerId = "Manufacturer",
}

const enum FIELD_NAMES {
  name = "name",
  description = "description",
  imageUrl = "imageUrl",
  manufacturerId = "manufacturerId",
}

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { categoryStore, manufacturerStore } = useStore();
  const {
    loadCategoryById,
    updateCategory,
    saveCategory,
    editMode,
    setEditMode,
    loadingInitial,
  } = categoryStore;
  const { loadManufacturers, manufacturers } = manufacturerStore;
  const [category, setCategory] = useState<CategoryFormValues | null>(null);

  const { id } = useParams();

  const handleCreateOrEditCategory = (category: CategoryFormValues) => {
    if (category.id) {
      updateCategory(category).then(() => navigate(`/admin/categories`));
    } else {
      category.id = uuid();
      saveCategory(category).then(() => navigate(`/admin/categories`));
    }
  };

  useEffect(() => {
    if (id) {
      loadCategoryById(id).then((category) => {
        setCategory(new CategoryFormValues(category));
      });
      setEditMode(true);
    } else {
      setCategory(new CategoryFormValues());
      setEditMode(false);
    }
    loadManufacturers();
  }, [id, loadCategoryById, setEditMode, loadManufacturers]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    imageUrl: Yup.string().url("Invalid URL"),
    manufacturerId: Yup.string().required("Required"),
  });

  if (editMode && (loadingInitial || !category)) return <CircularProgress />;

  return (
    category && (
      <>
        <h1>{editMode ? "Edit Category" : "Add Category"}</h1>
        <Formik
          initialValues={category}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateOrEditCategory(values);
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue }) => (
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
                    fullWidth
                    rows={3}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.imageUrl}
                    label={DISPLAY_NAMES.imageUrl}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Manufacturer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category.manufacturerId}
                      onChange={(e) =>
                        setFieldValue(
                          FIELD_NAMES.manufacturerId,
                          e.target.value
                        )
                      }
                    >
                      {manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      to={`/admin/categories`}
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

export default observer(CategoryForm);
