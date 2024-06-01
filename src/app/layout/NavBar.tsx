import * as React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store.ts";
import { useNavigate } from "react-router-dom";

const settings = ["Profile", "Logout"];
const AppName = "SALES CATALOGUE";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { userStore, cartStore } = useStore();
  const navigate = useNavigate();

  const handleOpenUserMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = React.useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleCartBtnClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      navigate("/user/cart");
    },
    [navigate]
  );

  const UserMenu = ({ anchorEl, handleClose }) => (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {settings.map((setting) => (
        <MenuItem
          key={setting}
          onClick={() => {
            handleClose();
            if (setting === "Logout") {
              userStore.logout();
            }
          }}
        >
          {setting}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar
      position="static"
      sx={{
        mb: 3,
        height: "70px",
        // , backgroundColor: '#6e4183'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex">
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {AppName}
            </Typography>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          </Box>

          <Box
            display="flex"
            ml="auto"
            alignItems="center"
            sx={{ flexGrow: 0 }}
          >
            {userStore.user && userStore.user.role !== "Admin" && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Cart">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="4 items in Cart"
                    sx={{ p: 0, mr: 3 }}
                    onClick={handleCartBtnClick}
                  >
                    <Badge badgeContent={cartStore.totalItems} color="error">
                      <ShoppingCartIcon sx={{ mr: 0.5 }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={userStore.user?.displayName}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userStore.user?.displayName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <UserMenu
                anchorEl={anchorElUser}
                handleClose={handleCloseUserMenu}
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default observer(NavBar);
