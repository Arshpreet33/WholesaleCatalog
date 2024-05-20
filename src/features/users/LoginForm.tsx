import { styled } from "@mui/system";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import MyTextInput from "../../app/common/form/MyTextInput.tsx";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store.ts";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: 400,
  margin: "auto",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled(Form)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const LoginForm = () => {
  const { userStore } = useStore();
  const initialValues = {
    email: "",
    password: "",
    error: null,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        background:
          "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 60%, #F9C5D1 90%)",
        margin: 0,
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Container>
        <StyledPaper elevation={3}>
          <StyledTypography variant="h5">Admin Login</StyledTypography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setErrors }) => {
              try {
                await userStore.login(values);
              } catch (error) {
                setErrors({ error: "Invalid email or password" });
              }
            }}
          >
            {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
              <StyledForm onSubmit={handleSubmit} autoComplete="off">
                <MyTextInput name="email" label="Email" fullWidth />
                <MyTextInput
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
                <ErrorMessage
                  name="error"
                  render={() => (
                    <Box
                      sx={{
                        border: "1px solid red",
                        borderRadius: "4px",
                        padding: "8px",
                        margin: "8px 0",
                        backgroundColor: "#ffe6e6",
                      }}
                    >
                      <Typography color="error" variant="subtitle2">
                        {errors.error}
                      </Typography>
                    </Box>
                  )}
                />
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Login"}
                </StyledButton>
              </StyledForm>
            )}
          </Formik>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default observer(LoginForm);
