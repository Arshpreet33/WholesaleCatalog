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
import Delete from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { set } from "mobx";

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewSource(null);
  };

  const navigateToHome = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: pagingParams.pageSize,
    });
    navigate("/admin/products");
  };

  const handleCreateOrEditProduct = (product: ProductFormValues) => {
    if (!product.id) product.id = uuid();
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    if (editMode) {
      updateProduct(product.id!, formData).then(() => navigateToHome());
    } else {
      saveProduct(formData).then(() => navigateToHome());
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
              <Grid container spacing={20}>
                <Grid item xs={6}>
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
                    {!editMode && (
                      <Grid item>
                        <MyTextInput
                          name={FIELD_NAMES.categoryId}
                          label={DISPLAY_NAMES.categoryId}
                          select
                          list={categories}
                          defaultValue={
                            product.categoryId ?? categories?.[0]?.id
                          }
                          fullWidth
                        />
                      </Grid>
                    )}
                    <Grid item>
                      <Grid container spacing={8}>
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
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={4} direction={"column"}>
                    <Grid item>
                      {previewSource ? (
                        <div
                          style={{
                            width: "500px",
                            height: "400px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            border: "1px dashed gray",
                          }}
                        >
                          <img
                            src={previewSource}
                            alt="Product preview"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "500px",
                            height: "400px",
                            border: "1px dashed gray",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          No image selected - Please upload image
                        </div>
                      )}
                    </Grid>
                    <Grid item>
                      <Grid container spacing={5}>
                        <Grid item>
                          {!editMode || (editMode && !previewSource) ? (
                            <>
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="raised-button-file"
                                type="file"
                                onChange={(event) => {
                                  handleFileChange(event);
                                  setFieldValue(
                                    "image",
                                    event.currentTarget.files![0]
                                  );
                                }}
                              />
                              <label htmlFor="raised-button-file">
                                <Button
                                  variant="outlined"
                                  component="span"
                                  startIcon={<UploadIcon />}
                                >
                                  Upload Image
                                </Button>
                              </label>
                            </>
                          ) : null}
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClearImage}
                            startIcon={<Delete />}
                          >
                            Clear Image
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
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
