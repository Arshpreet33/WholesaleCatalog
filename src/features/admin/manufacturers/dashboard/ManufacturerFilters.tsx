import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import SearchBar from "../../../../app/common/form/SearchBar.tsx";
import "./styles.css";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

const ManufacturerFilters: React.FC = () => {
  const { manufacturerStore } = useStore();

  const {
    nameFilter,
    isActiveFilter,
    setNameFilter,
    setIsActiveFilter,
    setPagingParams,
    loadManufacturers,
  } = manufacturerStore;

  const loadFilteredManufacturers = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: manufacturerStore.pagingParams.pageSize,
    });
    loadManufacturers();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    loadFilteredManufacturers();
  };

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActiveFilter(event.target.checked);
    loadFilteredManufacturers();
  };

  return (
    <div>
      <div className="manufacturer-filters">
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
      </div>
    </div>
  );
};

export default observer(ManufacturerFilters);
