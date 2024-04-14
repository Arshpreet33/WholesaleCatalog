import React, { useEffect } from 'react'
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
} from '@mui/material'
import { useStore } from '../../../../app/stores/store.ts'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

const ClientDetails: React.FC<{}> = () => {
  const { clientStore } = useStore()
  const { loadClientById, loadingInitial, selectedClient } = clientStore

  const { id } = useParams()

  useEffect(() => {
    const loadClientDetails = async () => {
      await loadClientById(id ?? '')
    }

    if (id) {
      loadClientDetails()
    }
  }, [id, loadClientById])

  if (loadingInitial || !selectedClient) return <CircularProgress />

  const { code, name, email, phoneNumber, address } = selectedClient

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Client Details
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Code: {code}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Name: {name}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Email: {email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Phone: {phoneNumber}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                Address: {address}
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/admin/clients/edit/${id}`}
            sx={{ marginTop: 2 }}
          >
            Edit Client
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default observer(ClientDetails)
