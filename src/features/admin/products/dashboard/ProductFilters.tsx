import React, { useEffect } from "react";
import {
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import SearchBar from "../../../../app/common/form/SearchBar.tsx";
import "./styles.css";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

const ProductFilters: React.FC = () => {
  const { productStore } = useStore();
  const {
    nameFilter,
    isActiveFilter,
    loadingFilters,
    categories,
    loadActiveCategories,
    setNameFilter,
    setIsActiveFilter,
    setPagingParams,
    loadProducts,
    categoryIdFilter,
    setCategoryIdFilter,
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

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActiveFilter(event.target.checked);
    loadFilteredProducts();
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategoryIdFilter(event.target.value as string);
    loadFilteredProducts();
  };

  useEffect(() => {
    loadActiveCategories();
  }, [loadActiveCategories]);

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
        <FormControlLabel
          control={
            <Switch checked={isActiveFilter} onChange={handleIsActiveChange} />
          }
          label="Active"
        />
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

export default observer(ProductFilters);
