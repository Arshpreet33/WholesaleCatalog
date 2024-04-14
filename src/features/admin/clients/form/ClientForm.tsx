import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Button, CircularProgress, Grid } from '@mui/material'
import * as Yup from 'yup'
import { ClientFormValues } from '../../../../app/models/client.ts'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MyTextInput from '../../../../app/common/form/MyTextInput.tsx'
import { useStore } from '../../../../app/stores/store.ts'
import { observer } from 'mobx-react-lite'
import { v4 as uuid } from 'uuid'

const enum DISPLAY_NAMES {
  code = 'Code',
  name = 'Name',
  email = 'Email',
  phoneNumber = 'Phone Number',
  address = 'Address',
  address2 = 'Address 2',
  city = 'City',
  province = 'Province',
  postalCode = 'Postal Code',
}

const enum FIELD_NAMES {
  code = 'code',
  name = 'name',
  email = 'email',
  phoneNumber = 'phoneNumber',
  address = 'address',
  address2 = 'address2',
  city = 'city',
  province = 'province',
  postalCode = 'postalCode',
}

const ClientForm: React.FC = () => {
  const navigate = useNavigate()
  const { clientStore } = useStore()
  const {
    loadClientById,
    updateClient,
    saveClient,
    editMode,
    setEditMode,
    loadingInitial,
  } = clientStore
  const [client, setClient] = useState<ClientFormValues | null>(null)

  const { id } = useParams()

  const handleCreateOrEditClient = (client: ClientFormValues) => {
    if (client.id) {
      updateClient(client).then(() => navigate(`/admin/clients`))
    } else {
      client.id = uuid()
      saveClient(client).then(() => navigate(`/admin/clients`))
    }
  }

  useEffect(() => {
    if (id) {
      loadClientById(id).then((client) => {
        setClient(new ClientFormValues(client))
      })
      setEditMode(true)
    } else {
      setClient(new ClientFormValues())
      setEditMode(false)
    }
  }, [id, loadClientById, setEditMode])

  const validationSchema = Yup.object({
    code: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    province: Yup.string().required('Required'),
    postalCode: Yup.string().required('Required'),
  })

  if (editMode && (loadingInitial || !client)) return <CircularProgress />

  return (
    client && (
      <>
        <h1>{editMode ? 'Edit Client' : 'Add Client'}</h1>
        <Formik
          initialValues={client}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateOrEditClient(values)
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.code}
                    label={DISPLAY_NAMES.code}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.name}
                    label={DISPLAY_NAMES.name}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.email}
                    label={DISPLAY_NAMES.email}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.phoneNumber}
                    label={DISPLAY_NAMES.phoneNumber}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.address}
                    label={DISPLAY_NAMES.address}
                    rows={3}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.address2}
                    label={DISPLAY_NAMES.address2}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.city}
                    label={DISPLAY_NAMES.city}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.province}
                    label={DISPLAY_NAMES.province}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.postalCode}
                    label={DISPLAY_NAMES.postalCode}
                  />
                </Grid>

                <Grid item container spacing={8}>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting || !dirty || !isValid}
                    >
                      {editMode ? 'Save' : 'Add'}
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      component={Link}
                      to={`/admin/clients`}
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
  )
}

export default observer(ClientForm)
