import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Button, CircularProgress, Grid } from "@mui/material";
import * as Yup from "yup";
import { AppUserFormValues } from "../../../../app/models/user.ts";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../../../app/common/form/MyTextInput.tsx";
import { useStore } from "../../../../app/stores/store.ts";
import { observer } from "mobx-react-lite";

const enum DISPLAY_NAMES {
  username = "UserName",
  displayName = "Display Name",
  email = "Email",
  bio = "Bio",
}

const enum FIELD_NAMES {
  username = "username",
  displayName = "displayName",
  email = "email",
  bio = "bio",
}

const AppUserForm: React.FC = () => {
  const navigate = useNavigate();
  const { appUserStore } = useStore();
  const {
    editMode,
    pagingParams,
    loadingInitial,
    setPagingParams,
    setEditMode,
    loadAppUserByUsername,
    updateAppUser,
    saveAppUser,
  } = appUserStore;
  const [appUser, setAppUser] = useState<AppUserFormValues | null>(null);

  const { username } = useParams();

  const navigateToHome = () => {
    setPagingParams({
      pageNumber: 1,
      pageSize: pagingParams.pageSize,
    });
    navigate("/admin/appUsers");
  };

  const handleCreateOrEditAppUser = (appUser: AppUserFormValues) => {
    if (editMode) {
      updateAppUser(appUser).then(() => navigateToHome());
    } else {
      saveAppUser(appUser).then(() => navigateToHome());
    }
  };

  useEffect(() => {
    if (username) {
      loadAppUserByUsername(username).then((appUser) => {
        setAppUser(new AppUserFormValues(appUser));
      });
      setEditMode(true);
    } else {
      setAppUser(new AppUserFormValues());
      setEditMode(false);
    }
  }, [username, loadAppUserByUsername, setEditMode]);

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    displayName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    bio: Yup.string(),
  });

  if (editMode && (loadingInitial || !appUser)) return <CircularProgress />;

  return (
    appUser && (
      <>
        <h1>{editMode ? "Edit User" : "Add User"}</h1>
        <Formik
          initialValues={appUser}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateOrEditAppUser(values);
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.username}
                    label={DISPLAY_NAMES.username}
                    disabled={editMode}
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.displayName}
                    label={DISPLAY_NAMES.displayName}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.email}
                    label={DISPLAY_NAMES.email}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <MyTextInput
                    name={FIELD_NAMES.bio}
                    label={DISPLAY_NAMES.bio}
                    fullWidth
                    rows={3}
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
                      {editMode ? "Save" : "Add"}
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      component={Link}
                      to={`/admin/users`}
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
  );
};

export default observer(AppUserForm);
