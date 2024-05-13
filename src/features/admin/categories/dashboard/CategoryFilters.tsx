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

const CategoryFilters: React.FC = () => {
  const { categoryStore } = useStore();
  const {
    nameFilter,
    isActiveFilter,
    loadingInitial,
    manufacturers,
    loadActiveManufacturers,
    setNameFilter,
    setIsActiveFilter,
    setPagingParams,
    loadCategories,
    manufacturerIdFilter,
    setManufacturerIdFilter,
  } = categoryStore;

  const loadFilteredCategories = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: categoryStore.pagingParams.pageSize,
    });
    loadCategories();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    loadFilteredCategories();
  };

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActiveFilter(event.target.checked);
    loadFilteredCategories();
  };

  const handleManufacturerChange = (event: SelectChangeEvent<string>) => {
    setManufacturerIdFilter(event.target.value as string);
    loadFilteredCategories();
  };

  useEffect(() => {
    loadActiveManufacturers();
  }, [loadActiveManufacturers]);

  if (loadingInitial) return <CircularProgress />;

  return (
    <div>
      <div className="category-filters">
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
          <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={manufacturerIdFilter}
            onChange={handleManufacturerChange}
            className="manufacturer-select"
            label="Manufacturer"
            style={{ width: "200px" }}
          >
            <MenuItem value="">All</MenuItem>
            {manufacturers?.map((manufacturer) => (
              <MenuItem key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default observer(CategoryFilters);
