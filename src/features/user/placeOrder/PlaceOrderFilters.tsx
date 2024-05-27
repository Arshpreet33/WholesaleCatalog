import React, { useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import SearchBar from "../../../app/common/form/SearchBar.tsx";
import "./styles.css";
import { useStore } from "../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

const PlaceOrderFilters: React.FC = () => {
  const { productStore } = useStore();
  const {
    nameFilter,
    loadingFilters,
    categories,
    categoryIdFilter,
    manufacturers,
    manufacturerIdFilter,
    loadActiveCategories,
    setNameFilter,
    setPagingParams,
    loadProducts,
    setCategoryIdFilter,
    loadActiveManufacturers,
    setManufacturerIdFilter,
  } = productStore;

  const loadFilteredProducts = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: productStore.pagingParams.pageSize,
    });
    loadProducts();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    loadFilteredProducts();
  };

  const handleManufacturerChange = (event: SelectChangeEvent<string>) => {
    setCategoryIdFilter("");
    setManufacturerIdFilter(event.target.value as string);
    loadActiveCategories();
    loadFilteredProducts();
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategoryIdFilter(event.target.value as string);
    loadFilteredProducts();
  };

  useEffect(() => {
    loadActiveManufacturers();
  }, [loadActiveCategories, loadActiveManufacturers]);

  if (loadingFilters) return <CircularProgress />;

  return (
    <div>
      <div className="product-filters">
        <SearchBar
          label="Search by name"
          value={nameFilter}
          onChange={handleNameChange}
          className="search-bar"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={manufacturerIdFilter}
            onChange={handleManufacturerChange}
            className="manufacturer-select"
            label="Category"
            style={{ width: "200px" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {manufacturers?.map((manufacturer) => (
              <MenuItem key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={categoryIdFilter}
            onChange={handleCategoryChange}
            className="category-select"
            label="Category"
            style={{ width: "200px" }}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default observer(PlaceOrderFilters);
