import React from "react";
import { FormControlLabel, Switch } from "@mui/material";
import SearchBar from "../../../../app/common/form/SearchBar.tsx";
import "./styles.css";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

const AppUserFilters: React.FC = () => {
  const { appUserStore } = useStore();

  const {
    nameFilter,
    isActiveFilter,
    setNameFilter,
    setIsActiveFilter,
    setPagingParams,
    loadAppUsers,
  } = appUserStore;

  const loadFilteredUsers = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: appUserStore.pagingParams.pageSize,
    });
    loadAppUsers();
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
    loadFilteredUsers();
  };

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActiveFilter(event.target.checked);
    loadFilteredUsers();
  };

  return (
    <div>
      <div className="app-user-filters">
        <SearchBar
          label="Search by username, display name, or email"
          value={nameFilter}
          onChange={handleUsernameChange}
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

export default observer(AppUserFilters);
