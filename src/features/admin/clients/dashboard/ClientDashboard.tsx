import React from 'react'
import ClientList from './ClientList.tsx'
import ClientFilters from './ClientFilters.tsx'
import { Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { observer } from 'mobx-react-lite'
import { Link, Outlet } from 'react-router-dom'

const ClientDashboard: React.FC = () => {
  return (
    <div>
      <h1>Clients</h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ClientFilters />
        <Button
          component={Link}
          to="create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ alignSelf: 'baseline' }}
        >
          Add new
        </Button>
      </Box>
      <ClientList />
      <Outlet />
    </div>
  )
}

export default observer(ClientDashboard)
