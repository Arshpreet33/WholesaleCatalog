import React from 'react'
import { FormControlLabel, Switch } from '@mui/material'
import SearchBar from '../../../../app/common/form/SearchBar.tsx'
import './styles.css'
import { useStore } from '../../../../app/stores/store.ts'
import { observer } from 'mobx-react-lite'

const ClientFilters: React.FC = () => {
  const { clientStore } = useStore()

  const {
    nameFilter,
    isActiveFilter,
    setNameFilter,
    setIsActiveFilter,
    setPagingparams,
    loadClients,
  } = clientStore

  const loadFilteredClients = () => {
    setPagingparams({
      pageNumber: 1,
      pageSize: clientStore.pagingParams.pageSize,
    })
    loadClients()
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value)
    loadFilteredClients()
  }

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActiveFilter(event.target.checked)
    loadFilteredClients()
  }

  return (
    <div>
      <div className="client-filters">
        <SearchBar
          label="Search by code, name, or email"
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
  )
}

export default observer(ClientFilters)
