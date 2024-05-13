import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, CircularProgress, Grid } from "@mui/material";
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
  const { categoryStore } = useStore();
  const {
    loadingInitial,
    loadingFilters,
    editMode,
    manufacturers,
    pagingParams,
    setPagingParams,
    loadActiveManufacturers,
    loadCategoryById,
    updateCategory,
    saveCategory,
    setEditMode,
  } = categoryStore;

  const [category, setCategory] = useState<CategoryFormValues | null>(null);

  const { id } = useParams();

  const navigateToHome = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: pagingParams.pageSize,
    });
    navigate("/admin/categories");
  };

  const handleCreateOrEditCategory = (category: CategoryFormValues) => {
    if (category.id) {
      updateCategory(category).then(() => navigateToHome());
    } else {
      category.id = uuid();
      saveCategory(category).then(() => navigateToHome());
    }
  };

  useEffect(() => {
    loadActiveManufacturers();
    if (id) {
      loadCategoryById(id).then((category) => {
        setCategory(new CategoryFormValues(category));
      });
      setEditMode(true);
    } else {
      setCategory(new CategoryFormValues());
      setEditMode(false);
    }
  }, [id, loadCategoryById, setEditMode, loadActiveManufacturers]);

  const validationSchema_add = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    imageUrl: Yup.string().url("Invalid URL"),
    manufacturerId: Yup.string().required("Required"),
  });

  const validationSchema_edit = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    imageUrl: Yup.string().url("Invalid URL"),
  });

  if (
    editMode &&
    (loadingInitial || !category || loadingFilters || !manufacturers)
  )
    return <CircularProgress />;

  return (
    category && (
      <>
        <h1>{editMode ? "Edit Category" : "Add Category"}</h1>
        <Formik
          initialValues={category}
          validationSchema={
            editMode ? validationSchema_edit : validationSchema_add
          }
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
                {!editMode && (
                  <Grid item>
                    <MyTextInput
                      name={FIELD_NAMES.manufacturerId}
                      label={DISPLAY_NAMES.manufacturerId}
                      select
                      list={manufacturers}
                      defaultValue={
                        category.manufacturerId ?? manufacturers?.[0]?.id
                      }
                      fullWidth
                    />
                  </Grid>
                )}
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
