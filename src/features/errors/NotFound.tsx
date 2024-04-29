import { styled } from "@mui/system";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import Search from "@mui/icons-material/Search";

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const NotFound: React.FC = () => {
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
      <Container sx={{ textAlign: "center" }}>
        <Search style={{ fontSize: 100 }} />
        <StyledTypography variant="h4" className="header">
          Oops - We have looked everywhere and we couldn't find what you are
          looking for!
        </StyledTypography>
        <Link to="/">
          <StyledButton variant="contained" color="primary" className="button">
            Go to Home Page
          </StyledButton>
        </Link>
      </Container>
    </Box>
  );
};

export default NotFound;
