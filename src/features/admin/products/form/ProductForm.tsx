import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, CircularProgress, Grid } from "@mui/material";
import * as Yup from "yup";
import { ProductFormValues } from "../../../../app/models/product.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../../../app/common/form/MyTextInput.tsx";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";

const enum DISPLAY_NAMES {
  name = "Name",
  code = "Code",
  description = "Description",
  unitPrice = "Unit Price",
  unitWeight = "Unit Weight",
  itemsInCase = "Items in Case",
  casePrice = "Case Price",
  itemsInStock = "Items in Stock",
  casesInStock = "Cases in Stock",
  imageUrl = "Image URL",
  categoryId = "Category",
}

const enum FIELD_NAMES {
  name = "name",
  code = "code",
  description = "description",
  unitPrice = "unitPrice",
  unitWeight = "unitWeight",
  itemsInCase = "itemsInCase",
  casePrice = "casePrice",
  itemsInStock = "itemsInStock",
  casesInStock = "casesInStock",
  imageUrl = "imageUrl",
  categoryId = "categoryId",
}

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { productStore } = useStore();
  const {
    loadingInitial,
    loadingFilters,
    editMode,
    categories,
    pagingParams,
    setPagingParams,
    loadActiveCategories,
    loadProductById,
    updateProduct,
    saveProduct,
    setEditMode,
  } = productStore;

  const [product, setProduct] = useState<ProductFormValues | null>(null);

  const { id } = useParams();

  const navigateToHome = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: pagingParams.pageSize,
    });
    navigate("/admin/products");
  };

  const handleCreateOrEditProduct = (product: ProductFormValues) => {
    if (product.id) {
      updateProduct(product).then(() => navigateToHome());
    } else {
      product.id = uuid();
      saveProduct(product).then(() => navigateToHome());
    }
  };

  useEffect(() => {
    loadActiveCategories();
    if (id) {
      loadProductById(id).then((product) => {
        setProduct(new ProductFormValues(product));
      });
      setEditMode(true);
    } else {
      setProduct(new ProductFormValues());
      setEditMode(false);
    }
  }, [id, loadProductById, setEditMode, loadActiveCategories]);

  const validationSchema_add = Yup.object({
    name: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    unitPrice: Yup.number().required("Required"),
    unitWeight: Yup.number().required("Required"),
    itemsInCase: Yup.number().required("Required"),
    casePrice: Yup.number().required("Required"),
    itemsInStock: Yup.number().required("Required"),
    casesInStock: Yup.number().required("Required"),
    imageUrl: Yup.string().url("Invalid URL"),
    categoryId: Yup.string().required("Required"),
  });

  const validationSchema_edit = Yup.object({
    name: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    unitPrice: Yup.number().required("Required"),
    unitWeight: Yup.number().required("Required"),
    itemsInCase: Yup.number().required("Required"),
    casePrice: Yup.number().required("Required"),
    itemsInStock: Yup.number().required("Required"),
    casesInStock: Yup.number().required("Required"),
    imageUrl: Yup.string().url("Invalid URL"),
  });

  if (editMode && (loadingInitial || !product || loadingFilters || !categories))
    return <CircularProgress />;

  return (
    product && (
      <>
        <h1>{editMode ? "Edit Product" : "Add Product"}</h1>
        <Formik
          initialValues={product}
          validationSchema={
            editMode ? validationSchema_edit : validationSchema_add
          }
          onSubmit={(values) => {
            handleCreateOrEditProduct(values);
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.name}
                    label={DISPLAY_NAMES.name}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.code}
                    label={DISPLAY_NAMES.code}
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
                    name={FIELD_NAMES.unitPrice}
                    label={DISPLAY_NAMES.unitPrice}
                    type="number"
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.unitWeight}
                    label={DISPLAY_NAMES.unitWeight}
                    type="number"
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.itemsInCase}
                    label={DISPLAY_NAMES.itemsInCase}
                    type="number"
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.casePrice}
                    label={DISPLAY_NAMES.casePrice}
                    type="number"
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.itemsInStock}
                    label={DISPLAY_NAMES.itemsInStock}
                    type="number"
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.casesInStock}
                    label={DISPLAY_NAMES.casesInStock}
                    type="number"
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
                      name={FIELD_NAMES.categoryId}
                      label={DISPLAY_NAMES.categoryId}
                      select
                      list={categories}
                      defaultValue={product.categoryId ?? categories?.[0]?.id}
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
                      to={`/admin/products`}
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

export default observer(ProductForm);
